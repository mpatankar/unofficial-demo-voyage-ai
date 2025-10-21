// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Embeddings extends APIResource {
  /**
   * Voyage text embedding endpoint receives as input a string (or a list of strings)
   * and other arguments such as the preferred model name, and returns a response
   * containing a list of embeddings.
   */
  create(body: EmbeddingCreateParams, options?: RequestOptions): APIPromise<EmbeddingCreateResponse> {
    return this._client.post('/embeddings', { body, ...options });
  }
}

export interface EmbeddingCreateResponse {
  /**
   * An array of embedding objects.
   */
  data?: Array<EmbeddingCreateResponse.Data>;

  /**
   * Name of the model.
   */
  model?: string;

  /**
   * The object type, which is always "list".
   */
  object?: string;

  usage?: EmbeddingCreateResponse.Usage;
}

export namespace EmbeddingCreateResponse {
  export interface Data {
    /**
     * Each embedding is a vector represented as an array of float numbers when
     * `output_dtype` is set to `float` and as an array of integers for all other
     * values of `output_dtype` (`int8`, `uint8`, `binary`, and `ubinary`). The length
     * of this vector varies depending on the specific model, `output_dimension`, and
     * `output_dtype`.
     */
    embedding?: Array<number>;

    /**
     * An integer representing the index of the embedding within the list of
     * embeddings.
     */
    index?: number;

    /**
     * The object type, which is always "embedding".
     */
    object?: string;
  }

  export interface Usage {
    /**
     * The total number of tokens used for computing the embeddings.
     */
    total_tokens?: number;
  }
}

export interface EmbeddingCreateParams {
  /**
   * A single text string, or a list of texts as a list of strings, such as
   * `["I like cats", "I also like dogs"]`. Currently, we have two constraints on the
   * list: <ul> <li> The maximum length of the list is 128. </li> <li> The total
   * number of tokens in the list is at most 1M for `voyage-3-lite`; 320K for
   * `voyage-3` and `voyage-2`; and 120K for `voyage-3-large`, `voyage-code-3`,
   * `voyage-large-2-instruct`, `voyage-finance-2`, `voyage-multilingual-2`,
   * `voyage-law-2`, and `voyage-large-2`. </li> <ul>
   */
  input: string | Array<string>;

  /**
   * Name of the model. Recommended options: `voyage-3-large`, `voyage-3`,
   * `voyage-3-lite`, `voyage-code-3`, `voyage-finance-2`, `voyage-law-2`.
   */
  model: string;

  /**
   * Format in which the embeddings are encoded. Defaults to `null`. Other options:
   * `base64`. <ul> <li> If `null`, each embedding is an array of float numbers when
   * `output_dtype` is set to `float` and as an array of integers for all other
   * values of `output_dtype` (`int8`, `uint8`, `binary`, and `ubinary`). <li>
   * If `base64`, the embeddings are represented as a
   * <a href="https://docs.python.org/3/library/base64.html" target="_blank">Base64-encoded</a>
   * NumPy array of: </li>
   *
   *   <ul>
   *     <li> Floating-point numbers (<a href="https://numpy.org/doc/2.1/user/basics.types.html#numerical-data-types" target="_blank">numpy.float32</a>) for <code>output_dtype</code> set to <code>float</code>. </li>
   *     <li> Signed integers (<a href="https://numpy.org/doc/2.1/user/basics.types.html#numerical-data-types" target="_blank">numpy.int8</a>) for <code>output_dtype</code> set to <code>int8</code> or <code>binary</code>. </li>
   *     <li> Unsigned integers (<a href="https://numpy.org/doc/2.1/user/basics.types.html#numerical-data-types" target="_blank">numpy.uint8</a>) for <code>output_dtype</code> set to <code>uint8</code> or <code>ubinary</code>. </li>
   *   </ul>
   * </ul>
   */
  encoding_format?: 'base64' | null;

  /**
   * Type of the input text. Defaults to `null`. Other options: `query`, `document`.
   * <ul> <li> When `input_type` is `null`, the embedding model directly converts the
   * inputs (`texts`) into numerical vectors. For retrieval/search purposes, where a
   * "query" is used to search for relevant information among a collection of data
   * referred to as "documents," we recommend specifying whether your inputs
   * (`texts`) are intended as queries or documents by setting `input_type` to
   * `query` or `document`, respectively. In these cases, Voyage automatically
   * prepends a prompt to your `inputs` before vectorizing them, creating vectors
   * more tailored for retrieval/search tasks. Embeddings generated with and without
   * the `input_type` argument are compatible. </li> <li> For transparency, the
   * following prompts are prepended to your input. </li>
   *
   *   <ul>
   *     <li> For <code>query</code>, the prompt is <i>"Represent the query for retrieving supporting documents: ".</i> </li>
   *     <li> For <code>document</code>, the prompt is <i>"Represent the document for retrieval: ".</i> </li>
   *   </ul>
   * <ul> <ul>
   */
  input_type?: 'query' | 'document' | null;

  /**
   * The number of dimensions for resulting output embeddings. Defaults to `null`.
   * <ul> <li> Most models only support a single default dimension, used when
   * `output_dimension` is set to `null` (see output embedding dimensions
   * <a href="https://docs.voyageai.com/docs/embeddings" target="_blank">here</a>).
   * </li> <li> `voyage-3-large` and `voyage-code-3` support the following
   * `output_dimension` values: 2048, 1024 (default), 512, and 256. </li> </ul>
   */
  output_dimension?: number | null;

  /**
   * The data type for the embeddings to be returned. Defaults to `float`. Other
   * options: `int8`, `uint8`, `binary`, `ubinary`. `float` is supported for all
   * models. `int8`, `uint8`, `binary`, and `ubinary` are supported by
   * `voyage-3-large` and `voyage-code-3`. Please see our
   * <a href="https://docs.voyageai.com/docs/flexible-dimensions-and-quantization#quantization" target="_blank">guide</a>
   * for more details about output data types. <ul> <li> `float`: Each returned
   * embedding is a list of 32-bit (4-byte)
   * <a href="https://en.wikipedia.org/wiki/Single-precision_floating-point_format" target="_blank">single-precision
   * floating-point</a> numbers. This is the default and provides the highest
   * precision / retrieval accuracy. </li> <li> `int8` and `uint8`: Each returned
   * embedding is a list of 8-bit (1-byte) integers ranging from -128 to 127 and 0 to
   * 255, respectively. </li> <li> `binary` and `ubinary`: Each returned embedding is
   * a list of 8-bit integers that represent bit-packed, quantized single-bit
   * embedding values: `int8` for `binary` and `uint8` for `ubinary`. The length of
   * the returned list of integers is 1/8 of `output_dimension` (which is the actual
   * dimension of the embedding). The `binary` type uses the offset binary method.
   * Please refer to our guide for details on
   * <a href="https://docs.voyageai.com/docs/flexible-dimensions-and-quantization#offset-binary" target="_blank">offset
   * binary</a> and
   * <a href="https://docs.voyageai.com/docs/flexible-dimensions-and-quantization#quantization" target="_blank">binary
   * embeddings</a>. </ul>
   */
  output_dtype?: 'float' | 'int8' | 'uint8' | 'binary' | 'ubinary';

  /**
   * Whether to truncate the input texts to fit within the context length. Defaults
   * to `true`. <ul> <li> If `true`, an over-length input texts will be truncated to
   * fit within the context length, before vectorized by the embedding model. </li>
   * <li> If `false`, an error will be raised if any given text exceeds the context
   * length. </li> </ul>
   */
  truncation?: boolean;
}

export declare namespace Embeddings {
  export {
    type EmbeddingCreateResponse as EmbeddingCreateResponse,
    type EmbeddingCreateParams as EmbeddingCreateParams,
  };
}
