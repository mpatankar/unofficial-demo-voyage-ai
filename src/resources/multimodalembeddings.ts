// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Multimodalembeddings extends APIResource {
  /**
   * The Voyage multimodal embedding endpoint returns vector representations for a
   * given list of multimodal inputs consisting of text, images, or an interleaving
   * of both modalities.
   */
  create(
    body: MultimodalembeddingCreateParams,
    options?: RequestOptions,
  ): APIPromise<MultimodalembeddingCreateResponse> {
    return this._client.post('/multimodalembeddings', { body, ...options });
  }
}

export interface MultimodalembeddingCreateResponse {
  /**
   * An array of embedding objects.
   */
  data?: Array<MultimodalembeddingCreateResponse.Data>;

  /**
   * Name of the model.
   */
  model?: string;

  /**
   * The object type, which is always `list`.
   */
  object?: string;

  usage?: MultimodalembeddingCreateResponse.Usage;
}

export namespace MultimodalembeddingCreateResponse {
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

export interface MultimodalembeddingCreateParams {
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

export declare namespace Multimodalembeddings {
  export {
    type MultimodalembeddingCreateResponse as MultimodalembeddingCreateResponse,
    type MultimodalembeddingCreateParams as MultimodalembeddingCreateParams,
  };
}
