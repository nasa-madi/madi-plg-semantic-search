/* eslint-disable @typescript-eslint/no-explicit-any */

import { Service } from 'feathersjs__feathers';

export interface User {
  email: string;
  googleId: string;
}

export interface Message {
  role: string;
  content: string;
}

export interface ToolObject {
  description: string;
  name: string;
  parameters: object;
}

export interface Tool {
  type: string;
  function: ToolObject;
  plugin?: string;
  display?: string;
}

interface SearchSemanticScholarParams {
  query: string;
  limit?: number;
  publicationDateOrYear?: string;
  year?: string;
  venue?: string;
  fieldsOfStudy?: string;
  offset?: number;
}

interface SemanticScholarResult {
  paperId: string;
  url: string;
  title: string;
  venue: string;
  publicationVenue: string;
  year: number;
  authors: string[];
  abstract: string;
  publicationDate: string;
  tldr: string;
}

export interface PluginOptions {
  documents: Service<any>;
  chunks: Service<any>;
  uploads: Service<any>;
}
export interface Data extends SearchSemanticScholarParams { }

export interface RunOptions {
  user: User;
  messages: Message[];
  persona: Message;
  data: Data;
}

export class SemanticScholar {
  documents: Service<any> | undefined;
  chunks: Service<any> | undefined;
  uploads: Service<any> | undefined;

  constructor (options?: PluginOptions) {
    this.documents = options?.documents;
    this.chunks = options?.chunks;
    this.uploads = options?.uploads;
  }

  async run (options: RunOptions): Promise<string> {
    const { query, limit = 100, publicationDateOrYear, year, venue, fieldsOfStudy, offset = 0 }: Data = options.data || {};

    const fields = [
      'paperId',
      'url',
      'title',
      'venue',
      'publicationVenue',
      'year',
      'authors',
      'abstract',
      'publicationDate',
      'tldr',
      'fieldsOfStudy',
      'referenceCount',
      'citationCount',
      'influentialCitationCount',
      'isOpenAccess',
      'isPublisherLicensed'
    ].join(',');

    let url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(
      query
    )}&fields=${fields}&limit=${limit}&offset=${offset}`;

    if (publicationDateOrYear) url += `&publicationDate=${encodeURIComponent(publicationDateOrYear)}`;
    if (year) url += `&year=${encodeURIComponent(year)}`;
    if (venue) url += `&venue=${encodeURIComponent(venue)}`;
    if (fieldsOfStudy) url += `&fieldsOfStudy=${encodeURIComponent(fieldsOfStudy.join(','))}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data: SemanticScholarResult[] = await response.json();
      return JSON.stringify(data);
    } catch (error) {
      return JSON.stringify({ error: error.message });
    }
  }

  describe (): Tool {
    return searchSemanticScholarDesc;
  }
}

export const searchSemanticScholarDesc: Tool = {
  type: 'function',
  plugin: 'Semantic Scholar',
  display: 'Search Semantic Scholar',
  function: {
    name: 'searchSemanticScholar',
    description: 'Search for academic papers from Semantic Scholar.',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query for papers, e.g. "covid"'
        },
        limit: {
          type: 'integer',
          description: 'The maximum number of results to return (must be <= 100).',
          default: 100
        },
        publicationDateOrYear: {
          type: 'string',
          description:
            'Restrict results to the given range of publication dates or years (inclusive). Accepts the format <startDate>:<endDate> where each term is optional, allowing for specific dates, fixed ranges, or open-ended ranges.'
        },
        year: {
          type: 'string',
          description: 'Restrict results to the given publication year (inclusive).'
        },
        venue: {
          type: 'string',
          description: 'Restrict results by venue, including ISO4 abbreviations. Use a comma-separated list to include papers from more than one venue. Example: "Nature,Radiology".'
        },
        fieldsOfStudy: {
          type: 'string',
          description: 'Restrict results to given field-of-study. Available fields include "Computer Science", "Medicine", "Biology", etc.'
        },
        offset: {
          type: 'integer',
          description: 'When returning a list of results, start with the element at this position in the list.',
          default: 0
        }
      },
      required: ['query']
    }
  }
};
