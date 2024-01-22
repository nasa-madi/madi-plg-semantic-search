import { SemanticScholar, RunOptions, searchSemanticScholarDesc } from '../../src/index';
import assert from 'assert';
import { describe, beforeEach, afterEach, it } from 'node:test';
import nock from 'nock';

describe('SemanticScholar', () => {
  let semanticScholar: SemanticScholar;

  beforeEach(() => {
    semanticScholar = new SemanticScholar();

    // Mock the API endpoint
    nock('https://api.semanticscholar.org')
      .get('/v1/paper')
      .query(true)
      .reply(200, 'Mocked response');
  });

  afterEach(() => {
    // Clean up the mocked requests
    nock.cleanAll();
  });

  it('should fetch data from Semantic Scholar API', async () => {
    const options: RunOptions = {
      user: { email: 'test@example.com', googleId: '123' },
      messages: [],
      persona: { role: 'user', content: 'Hello' },
      data: { query: 'example' }
    };

    const result = await semanticScholar.run(options);

    assert.strictEqual(typeof result, 'string');
    assert.notStrictEqual(result, '');
  });

  it('should handle error when fetching data from Semantic Scholar API', async () => {
    const options: RunOptions = {
      user: { email: 'test@example.com', googleId: '123' },
      messages: [],
      persona: { role: 'user', content: 'Hello' },
      data: { query: 'invalid' }
    };

    const result = await semanticScholar.run(options);

    assert.strictEqual(typeof result, 'string');
    assert.ok(result.includes('error'));
  });

  it('should return the correct tool description', () => {
    const semanticScholar = new SemanticScholar();
    const description = semanticScholar.describe();
    assert.deepStrictEqual(description, searchSemanticScholarDesc);
  });
});
