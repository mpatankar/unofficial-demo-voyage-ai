// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Rerank extends APIResource {
  /**
   * Voyage reranker endpoint receives as input a query, a list of documents, and
   * other arguments such as the model name, and returns a response containing the
   * reranking results.
   */
  create(body: RerankCreateParams, options?: RequestOptions): APIPromise<RerankCreateResponse> {
    return this._client.post('/rerank', { body, ...options });
  }
}

export interface RerankCreateResponse {
  /**
   * An array of the reranking results, sorted by the descending order of relevance
   * scores.
   */
  data?: Array<RerankCreateResponse.Data>;

  /**
   * Name of the model.
   */
  model?: string;

  /**
   * The object type, which is always "list".
   */
  object?: string;

  usage?: RerankCreateResponse.Usage;
}

export namespace RerankCreateResponse {
  export interface Data {
    /**
     * The document string. Only returned when return_documents is set to true.
     */
    document?: string;

    /**
     * The index of the document in the input list.
     */
    index?: number;

    /**
     * The relevance score of the document with respect to the query.
     */
    relevance_score?: number;
  }

  export interface Usage {
    /**
     * The total number of tokens used for computing the reranking.
     */
    total_tokens?: number;
  }
}

export interface RerankCreateParams {
  /**
   * The documents to be reranked as a list of strings. <ul> <li> The number of
   * documents cannot exceed 1000. </li> <li> The sum of the number of tokens in the
   * query and the number of tokens in any single document cannot exceed 16000 for
   * `rerank-2`; 8000 for `rerank-2-lite` and `rerank-1`; and 4000
   * for `rerank-lite-1`. </li> <li> The total number of tokens, defined as "the
   * number of query tokens × the number of documents + sum of the number of tokens
   * in all documents", cannot exceed 600K for `rerank-2` and `rerank-2-lite`, and
   * 300K for `rerank-1` and `rerank-lite-1`. Please see our
   * <a href="https://docs.voyageai.com/docs/faq#what-is-the-total-number-of-tokens-for-the-rerankers">FAQ</a>.
   * </li> </ul>
   */
  documents: Array<string>;

  /**
   * Name of the model. Recommended options: `rerank-2`, `rerank-2-lite`.
   */
  model: string;

  /**
   * The query as a string. The query can contain a maximum of 4000 tokens for
   * `rerank-2`, 2000 tokens for `rerank-2-lite` and `rerank-1`, and 1000 tokens for
   * `rerank-lite-1`.
   */
  query: string;

  /**
   * Whether to return the documents in the response. Defaults to `false`. <ul> <li>
   * If `false`, the API will return a list of {"index", "relevance_score"} where
   * "index" refers to the index of a document within the input list. </li> <li> If
   * `true`, the API will return a list of {"index", "document", "relevance_score"}
   * where "document" is the corresponding document from the input list. </li> </ul>
   */
  return_documents?: boolean;

  /**
   * The number of most relevant documents to return. If not specified, the reranking
   * results of all documents will be returned.
   */
  top_k?: number | null;

  /**
   * Whether to truncate the input to satisfy the "context length limit" on the query
   * and the documents. Defaults to `true`. <ul> <li> If `true`, the query and
   * documents will be truncated to fit within the context length limit, before
   * processed by the reranker model. </li> <li> If `false`, an error will be raised
   * when the query exceeds 4000 tokens for `rerank-2`; 2000 tokens `rerank-2-lite`
   * and `rerank-1`; and 1000 tokens for `rerank-lite-1`, or the sum of the number of
   * tokens in the query and the number of tokens in any single document exceeds
   * 16000 for `rerank-2`; 8000 for `rerank-2-lite` and `rerank-1`; and 4000
   * for `rerank-lite-1`. </li> </ul>
   */
  truncation?: boolean;
}

export declare namespace Rerank {
  export { type RerankCreateResponse as RerankCreateResponse, type RerankCreateParams as RerankCreateParams };
}
