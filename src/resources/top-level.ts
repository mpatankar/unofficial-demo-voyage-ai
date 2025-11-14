// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface EmbedResponse {
  /**
   * An array of embedding objects.
   */
  data?: Array<EmbedResponse.Data>;

  /**
   * Name of the model.
   */
  model?: string;

  /**
   * The object type, which is always "list".
   */
  object?: string;

  usage?: EmbedResponse.Usage;
}

export namespace EmbedResponse {
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

export interface EmbedMultimodalResponse {
  /**
   * An array of embedding objects.
   */
  data?: Array<EmbedMultimodalResponse.Data>;

  /**
   * Name of the model.
   */
  model?: string;

  /**
   * The object type, which is always `list`.
   */
  object?: string;

  usage?: EmbedMultimodalResponse.Usage;
}

export namespace EmbedMultimodalResponse {
  export interface Data {
    /**
     * The embedding vector consists of a list of floating-point numbers or a
     * Base64-encoded NumPy array depending on `output_encoding`. The length of this
     * vector varies depending on the specific model.
     */
    embedding?: Array<unknown>;

    /**
     * An integer representing the index of the embedding within the list of
     * embeddings.
     */
    index?: number;

    /**
     * The object type, which is always `embedding`.
     */
    object?: string;
  }

  export interface Usage {
    /**
     * The total number of image pixels in the list of inputs.
     */
    image_pixels?: number;

    /**
     * The total number of text tokens in the list of inputs.
     */
    text_tokens?: number;

    /**
     * The combined total of text and image tokens. Every 560 pixels counts as a token.
     */
    total_tokens?: number;
  }
}

export interface RerankResponse {
  /**
   * An array of the reranking results, sorted by the descending order of relevance
   * scores.
   */
  data?: Array<RerankResponse.Data>;

  /**
   * Name of the model.
   */
  model?: string;

  /**
   * The object type, which is always "list".
   */
  object?: string;

  usage?: RerankResponse.Usage;
}

export namespace RerankResponse {
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

export interface EmbedParams {
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

export interface EmbedMultimodalParams {
  /**
   * A list of multimodal inputs to be vectorized.
   *
   * A single input in the list is a dictionary containing a single key `"content"`,
   * whose value represents a sequence of text and images. <ul>
   *
   *   <li> The value of <code>"content"</code> is a list of dictionaries, each representing a single piece of text or image. The dictionaries have four possible keys:
   *       <ol class="nested-ordered-list">
   *           <li> <b>type</b>: Specifies the type of the piece of the content. Allowed values are <code>text</code>, <code>image_url</code>, or <code>image_base64</code>.</li>
   *           <li> <b>text</b>: Only present when <code>type</code> is <code>text</code>. The value should be a text string.</li>
   *           <li> <b>image_base64</b>: Only present when <code>type</code> is <code>image_base64</code>. The value should be a Base64-encoded image in the <a href="https://developer.mozilla.org/en-US/docs/Web/URI/Schemes/data" target="_blank">data URL</a> format <code>data:[&lt;mediatype&gt;];base64,&lt;data&gt;</code>. Currently supported <code>mediatypes</code> are: <code>image/png</code>, <code>image/jpeg</code>, <code>image/webp</code>, and <code>image/gif</code>.</li>
   *           <li> <b>image_url</b>: Only present when <code>type</code> is <code>image_url</code>. The value should be a URL linking to the image. We support PNG, JPEG, WEBP, and GIF images.</li>
   *       </ol>
   *   </li>
   *   <li> <b>Note</b>: Only one of the keys, <code>image_base64</code> or <code>image_url</code>, should be present in each dictionary for image data. Consistency is required within a request, meaning each request should use either <code>image_base64</code> or <code>image_url</code> exclusively for images, not both.
   *
   *   <details> <summary> Example payload where <code>inputs</code> contains an image as a URL </summary>
   *
   *
   *       The <code>inputs</code> list contains a single input, which consists of a piece of text and an image (which is provided via a URL).
   *       <pre><code>
   *       {
   *         "inputs": [
   *           {
   *             "content": [
   *               {
   *                 "type": "text",
   *                 "text": "This is a banana."
   *               },
   *               {
   *                 "type": "image_url",
   *                 "image_url": "https://raw.githubusercontent.com/voyage-ai/voyage-multimodal-3/refs/heads/main/images/banana.jpg"
   *               }
   *             ]
   *           }
   *         ],
   *         "model": "voyage-multimodal-3"
   *       }
   *       </code></pre>
   *
   *   </details>
   *   <details> <summary> Example payload where <code>inputs</code> contains a Base64 image </summary>
   *
   *
   *       Below is an equivalent example to the one above where the image content is a Base64 image instead of a URL. (Base64 images can be lengthy, so the example only shows a shortened version.)
   *       <pre><code>
   *       {
   *         "inputs": [
   *           {
   *             "content": [
   *               {
   *                 "type": "text",
   *                 "text": "This is a banana."
   *               },
   *               {
   *                 "type": "image_base64",
   *                 "image_base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA..."
   *               }
   *             ]
   *           }
   *         ],
   *         "model": "voyage-multimodal-3"
   *       }
   *       </code></pre>
   *
   *   </details>
   *   </li>
   * </ul>
   * <span style="font-size: 13px;">The following constraints apply to the <code>inputs</code> list:</span> <ul>
   *     <li> The list must not contain more than 1000 inputs. </li>
   *     <li> Each image must not contain more than 16 million pixels or be larger than 20 MB in size. </li>
   *     <li> With every 560 pixels of an image being counted as a token, each input in the list must not exceed 32,000 tokens, and the total number of tokens across all inputs must not exceed 320,000. </li>
   * </ul>
   */
  inputs: Array<unknown>;

  /**
   * Name of the model. Currently, the only supported model is `voyage-multimodal-3`.
   */
  model: string;

  /**
   * Type of the input. Defaults to `null`. Other options: `query`, `document`. <ul>
   * <li> When `input_type` is `null`, the embedding model directly converts the
   * `inputs` into numerical vectors. For retrieval/search purposes, where a "query",
   * which can be text or image in this case, is used to search for relevant
   * information among a collection of data referred to as "documents," we recommend
   * specifying whether your `inputs` are intended as queries or documents by setting
   * `input_type` to `query` or `document`, respectively. In these cases, Voyage
   * automatically prepends a prompt to your `inputs` before vectorizing them,
   * creating vectors more tailored for retrieval/search tasks. Since inputs can be
   * multimodal, "queries" and "documents" can be text, images, or an interleaving of
   * both modalities. Embeddings generated with and without the `input_type` argument
   * are compatible. </li> <li> For transparency, the following prompts are prepended
   * to your input. </li>
   *
   *   <ul>
   *     <li> For <code>query</code>, the prompt is <i>"Represent the query for retrieving supporting documents: ".</i> </li>
   *     <li> For <code>document</code>, the prompt is <i>"Represent the document for retrieval: ".</i> </li>
   *   </ul>
   * <ul>
   */
  input_type?: 'query' | 'document' | null;

  /**
   * Format in which the embeddings are encoded. Defaults to `null`. <ul> <li> If
   * `null`, the embeddings are represented as a list of floating-point numbers.
   * </li> <li> If `base64`, the embeddings are represented as a Base64-encoded NumPy
   * array of single-precision floats. </li> </ul>
   */
  output_encoding?: 'base64' | null;

  /**
   * Whether to truncate the inputs to fit within the context length. Defaults to
   * `true`. <ul> <li> If `true`, an over-length input will be truncated to fit
   * within the context length before being vectorized by the embedding model. If the
   * truncation happens in the middle of an image, the entire image will be
   * discarded. </li> <li> If `false`, an error will be raised if any input exceeds
   * the context length. </li> </ul>
   */
  truncation?: boolean;
}

export interface RerankParams {
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

export declare namespace TopLevel {
  export {
    type EmbedResponse as EmbedResponse,
    type EmbedMultimodalResponse as EmbedMultimodalResponse,
    type RerankResponse as RerankResponse,
    type EmbedParams as EmbedParams,
    type EmbedMultimodalParams as EmbedMultimodalParams,
    type RerankParams as RerankParams,
  };
}
