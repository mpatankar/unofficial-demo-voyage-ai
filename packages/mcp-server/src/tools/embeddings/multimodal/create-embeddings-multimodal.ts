// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'voyage-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'voyage-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Voyage from 'unofficial-demo-voyage-ai';

export const metadata: Metadata = {
  resource: 'embeddings.multimodal',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/multimodalembeddings',
  operationId: 'multimodal-embeddings-api',
};

export const tool: Tool = {
  name: 'create_embeddings_multimodal',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThe Voyage multimodal embedding endpoint returns vector representations for a given list of multimodal inputs consisting of text, images, or an interleaving of both modalities.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/multimodal_create_response',\n  $defs: {\n    multimodal_create_response: {\n      type: 'object',\n      properties: {\n        data: {\n          type: 'array',\n          description: 'An array of embedding objects.',\n          items: {\n            type: 'object',\n            properties: {\n              embedding: {\n                type: 'array',\n                description: 'The embedding vector consists of a list of floating-point numbers or a Base64-encoded NumPy array depending on `output_encoding`. The length of this vector varies depending on the specific model.\\n',\n                items: {\n                  type: 'object',\n                  additionalProperties: true\n                }\n              },\n              index: {\n                type: 'integer',\n                description: 'An integer representing the index of the embedding within the list of embeddings.\\n'\n              },\n              object: {\n                type: 'string',\n                description: 'The object type, which is always `embedding`.'\n              }\n            }\n          }\n        },\n        model: {\n          type: 'string',\n          description: 'Name of the model.'\n        },\n        object: {\n          type: 'string',\n          description: 'The object type, which is always `list`.'\n        },\n        usage: {\n          type: 'object',\n          properties: {\n            image_pixels: {\n              type: 'integer',\n              description: 'The total number of image pixels in the list of inputs.'\n            },\n            text_tokens: {\n              type: 'integer',\n              description: 'The total number of text tokens in the list of inputs.'\n            },\n            total_tokens: {\n              type: 'integer',\n              description: 'The combined total of text and image tokens. Every 560 pixels counts as a token.'\n            }\n          }\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      inputs: {
        type: 'array',
        description:
          'A list of multimodal inputs to be vectorized.<br> <br> A single input in the list is a dictionary containing a single key `"content"`, whose value represents a sequence of text and images. <ul>\n  <li> The value of <code>"content"</code> is a list of dictionaries, each representing a single piece of text or image. The dictionaries have four possible keys:\n      <ol class="nested-ordered-list">\n          <li> <b>type</b>: Specifies the type of the piece of the content. Allowed values are <code>text</code>, <code>image_url</code>, or <code>image_base64</code>.</li>\n          <li> <b>text</b>: Only present when <code>type</code> is <code>text</code>. The value should be a text string.</li>\n          <li> <b>image_base64</b>: Only present when <code>type</code> is <code>image_base64</code>. The value should be a Base64-encoded image in the <a href="https://developer.mozilla.org/en-US/docs/Web/URI/Schemes/data" target="_blank">data URL</a> format <code>data:[&lt;mediatype&gt;];base64,&lt;data&gt;</code>. Currently supported <code>mediatypes</code> are: <code>image/png</code>, <code>image/jpeg</code>, <code>image/webp</code>, and <code>image/gif</code>.</li>\n          <li> <b>image_url</b>: Only present when <code>type</code> is <code>image_url</code>. The value should be a URL linking to the image. We support PNG, JPEG, WEBP, and GIF images.</li>\n      </ol>\n  </li>\n  <li> <b>Note</b>: Only one of the keys, <code>image_base64</code> or <code>image_url</code>, should be present in each dictionary for image data. Consistency is required within a request, meaning each request should use either <code>image_base64</code> or <code>image_url</code> exclusively for images, not both.<br>\n  <br>\n  <details> <summary> Example payload where <code>inputs</code> contains an image as a URL </summary>\n      <br>\n      The <code>inputs</code> list contains a single input, which consists of a piece of text and an image (which is provided via a URL).\n      <pre><code>\n      {\n        "inputs": [\n          {   \n            "content": [\n              {   \n                "type": "text",\n                "text": "This is a banana."\n              },  \n              {   \n                "type": "image_url",\n                "image_url": "https://raw.githubusercontent.com/voyage-ai/voyage-multimodal-3/refs/heads/main/images/banana.jpg"\n              }   \n            ]   \n          }   \n        ],  \n        "model": "voyage-multimodal-3"\n      }\n      </code></pre>\n  </details>\n  <details> <summary> Example payload where <code>inputs</code> contains a Base64 image </summary>\n      <br>\n      Below is an equivalent example to the one above where the image content is a Base64 image instead of a URL. (Base64 images can be lengthy, so the example only shows a shortened version.)\n      <pre><code>  \n      {\n        "inputs": [\n          {   \n            "content": [\n              {   \n                "type": "text",\n                "text": "This is a banana."\n              },  \n              {   \n                "type": "image_base64",\n                "image_base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA..."\n              }   \n            ]   \n          }   \n        ],  \n        "model": "voyage-multimodal-3"\n      }\n      </code></pre>\n  </details>\n  </li>\n</ul>\n<span style="font-size: 13px;">The following constraints apply to the <code>inputs</code> list:</span> <ul>\n    <li> The list must not contain more than 1000 inputs. </li>\n    <li> Each image must not contain more than 16 million pixels or be larger than 20 MB in size. </li>\n    <li> With every 560 pixels of an image being counted as a token, each input in the list must not exceed 32,000 tokens, and the total number of tokens across all inputs must not exceed 320,000. </li>\n</ul>\n',
        items: {
          type: 'object',
          additionalProperties: true,
        },
      },
      model: {
        type: 'string',
        description: 'Name of the model. Currently, the only supported model is `voyage-multimodal-3`.\n',
      },
      input_type: {
        type: 'string',
        description:
          'Type of the input. Defaults to `null`. Other options: `query`, `document`. <ul> <li> When `input_type` is `null`, the embedding model directly converts the `inputs` into numerical vectors. For retrieval/search purposes, where a "query", which can be text or image in this case, is used to search for relevant information among a collection of data referred to as "documents," we recommend specifying whether your `inputs` are intended as queries or documents by setting `input_type` to `query` or `document`, respectively. In these cases, Voyage automatically prepends a prompt to your `inputs` before vectorizing them, creating vectors more tailored for retrieval/search tasks. Since inputs can be multimodal, "queries" and "documents" can be text, images, or an interleaving of both modalities. Embeddings generated with and without the `input_type` argument are compatible. </li> <li> For transparency, the following prompts are prepended to your input. </li>\n  <ul>\n    <li> For <code>query</code>, the prompt is <i>"Represent the query for retrieving supporting documents: ".</i> </li>\n    <li> For <code>document</code>, the prompt is <i>"Represent the document for retrieval: ".</i> </li>\n  </ul> \n<ul>',
        enum: ['query', 'document'],
      },
      output_encoding: {
        type: 'string',
        description:
          'Format in which the embeddings are encoded. Defaults to `null`. <ul> <li> If `null`, the embeddings are represented as a list of floating-point numbers. </li>  <li> If `base64`, the embeddings are represented as a Base64-encoded NumPy array of single-precision floats. </li>  </ul>',
        enum: ['base64'],
      },
      truncation: {
        type: 'boolean',
        description:
          'Whether to truncate the inputs to fit within the context length. Defaults to `true`. <ul>  <li> If `true`, an over-length input will be truncated to fit within the context length before being vectorized by the embedding model. If the truncation happens in the middle of an image, the entire image will be discarded. </li> <li> If `false`, an error will be raised if any input exceeds the context length. </li>  </ul>\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['inputs', 'model'],
  },
  annotations: {},
};

export const handler = async (client: Voyage, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.embeddings.multimodal.create(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
