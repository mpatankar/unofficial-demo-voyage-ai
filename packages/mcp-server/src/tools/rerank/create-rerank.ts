// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'voyage-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'voyage-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Voyage from 'unofficial-demo-voyage-ai';

export const metadata: Metadata = {
  resource: 'rerank',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/rerank',
  operationId: 'reranker-api',
};

export const tool: Tool = {
  name: 'create_rerank',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nVoyage reranker endpoint receives as input a query, a list of documents, and other arguments such as the model name, and returns a response containing the reranking results.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/rerank_create_response',\n  $defs: {\n    rerank_create_response: {\n      type: 'object',\n      properties: {\n        data: {\n          type: 'array',\n          description: 'An array of the reranking results, sorted by the descending order of relevance scores.\\n',\n          items: {\n            type: 'object',\n            properties: {\n              document: {\n                type: 'string',\n                description: 'The document string. Only returned when return_documents is set to true.\\n'\n              },\n              index: {\n                type: 'integer',\n                description: 'The index of the document in the input list.'\n              },\n              relevance_score: {\n                type: 'number',\n                description: 'The relevance score of the document with respect to the query.'\n              }\n            }\n          }\n        },\n        model: {\n          type: 'string',\n          description: 'Name of the model.'\n        },\n        object: {\n          type: 'string',\n          description: 'The object type, which is always \"list\".'\n        },\n        usage: {\n          type: 'object',\n          properties: {\n            total_tokens: {\n              type: 'integer',\n              description: 'The total number of tokens used for computing the reranking.'\n            }\n          }\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      documents: {
        type: 'array',
        description:
          'The documents to be reranked as a list of strings. <ul> <li> The number of documents cannot exceed 1000. </li> <li> The sum of the number of tokens in the query and the number of tokens in any single document cannot exceed 16000 for `rerank-2`; 8000 for `rerank-2-lite` and `rerank-1`; and 4000 for `rerank-lite-1`. </li> <li> The total number of tokens, defined as "the number of query tokens × the number of documents + sum of the number of tokens in all documents", cannot exceed 600K for `rerank-2` and `rerank-2-lite`, and 300K for `rerank-1` and `rerank-lite-1`. Please see our <a href="https://docs.voyageai.com/docs/faq#what-is-the-total-number-of-tokens-for-the-rerankers">FAQ</a>. </li> </ul>\n',
        items: {
          type: 'string',
        },
      },
      model: {
        type: 'string',
        description: 'Name of the model. Recommended options: `rerank-2`, `rerank-2-lite`.\n',
      },
      query: {
        type: 'string',
        description:
          'The query as a string. The query can contain a maximum of 4000 tokens for `rerank-2`, 2000 tokens for `rerank-2-lite` and `rerank-1`, and 1000 tokens for `rerank-lite-1`.\n',
      },
      return_documents: {
        type: 'boolean',
        description:
          'Whether to return the documents in the response. Defaults to `false`. <ul> <li> If `false`, the API will return a list of {"index", "relevance_score"} where "index" refers to the index of a document within the input list. </li> <li> If `true`, the API will return a list of {"index", "document", "relevance_score"} where "document" is the corresponding document from the input list. </li> </ul>\n',
      },
      top_k: {
        type: 'integer',
        description:
          'The number of most relevant documents to return. If not specified, the reranking results of all documents will be returned.\n',
      },
      truncation: {
        type: 'boolean',
        description:
          'Whether to truncate the input to satisfy the "context length limit" on the query and the documents. Defaults to `true`. <ul> <li> If `true`,  the query and documents will be truncated to fit within the context length limit, before processed by the reranker model. </li> <li> If `false`, an error will be raised when the query exceeds 4000 tokens for `rerank-2`; 2000 tokens `rerank-2-lite` and `rerank-1`; and 1000 tokens for `rerank-lite-1`, or the sum of the number of tokens in the query and the number of tokens in any single document exceeds 16000 for `rerank-2`; 8000 for `rerank-2-lite` and `rerank-1`; and 4000 for `rerank-lite-1`. </li> </ul>\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['documents', 'model', 'query'],
  },
  annotations: {},
};

export const handler = async (client: Voyage, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.rerank.create(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
