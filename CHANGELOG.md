# Changelog

## 0.2.0 (2026-01-13)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/mpatankar/unofficial-demo-voyage-ai/compare/v0.1.0...v0.2.0)

### ⚠ BREAKING CHANGES

* **mcp:** remove deprecated tool schemes
* **mcp:** **Migration:** To migrate, simply modify the command used to invoke the MCP server. Currently, the only supported tool scheme is code mode. Now, starting the server with just `node /path/to/mcp/server` or `npx package-name` will invoke code tools: changing your command to one of these is likely all you will need to do.

### Features

* **api:** manual updates ([c4addac](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/c4addacdcc1cf33dbd5407fae99ea17452c78acf))
* **mcp:** add detail field to docs search tool ([cb469fd](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/cb469fdb91a974fde0c603d66bf443130c70c684))
* **mcp:** add typescript check to code execution tool ([058bc6c](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/058bc6ce7abaacc07e75904033249b76201428d2))
* **mcp:** handle code mode calls in the Stainless API ([0905355](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/090535518f760cd0a92add23daff9f2f79651109))
* **mcp:** return logs on code tool errors ([4e51931](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/4e51931e168442ec6b1207b0e312858218a0705f))


### Bug Fixes

* **mcp:** add client instantiation options to code tool ([2fbca94](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/2fbca945bbc608d1ed3a2daeeb45e70a48fcf6e2))
* **mcp:** correct code tool API endpoint ([4031800](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/40318004dd659f35511d5879051fc29a1c2decea))
* **mcp:** correct code tool api output types ([75efd4b](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/75efd4bfc7b4a9c193eea494cb108af05cda41e0))
* **mcp:** fix env parsing ([0b36b54](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/0b36b54ca0020750a0ed9d5e13a6ab06e1a76c1f))
* **mcp:** fix options parsing ([17709c5](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/17709c52bd1e47af7d6f1f76400b0a3410c36f61))
* **mcp:** pass base url to code tool ([8345414](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/834541464845073bbe12dc0bc798f51c4d9219f6))
* **mcp:** return correct lines on typescript errors ([8fb54dc](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/8fb54dcc6dad6449c3b354e19f5a6d658d974480))
* **mcp:** return tool execution error on api error ([b35af34](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/b35af343365e0d78eca1483706e033e77825414c))
* **mcp:** update code tool prompt ([a05c59d](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/a05c59d206e515cb44191f26eff1cd949780cc56))


### Chores

* break long lines in snippets into multiline ([52debe9](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/52debe95beb81aa8f81b41532479b0f88242eb27))
* **client:** fix logger property type ([3a9c5a5](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/3a9c5a5b93ce1ff7624313c278f10c789cda8e57))
* **internal:** codegen related update ([61ae942](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/61ae94293ad3190c79867ee240a3a8af263281e4))
* **internal:** codegen related update ([f9315bc](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/f9315bc5ee550b16e0c68fa3a7e6a8a12e447d7b))
* **internal:** codegen related update ([507684e](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/507684e6dc49a135ae2f9106fe578bd3e8a85c84))
* **internal:** codegen related update ([b44ef09](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/b44ef09494661cd274f64b5e3dfef69bcd8aaeda))
* **internal:** codegen related update ([a812310](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/a81231055eb45eba8dd6ede712a87161242449d9))
* **internal:** codegen related update ([10aa72d](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/10aa72d44654bebcf25c266cbc64d655a84598c0))
* **internal:** codegen related update ([94ac3e0](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/94ac3e0903fd8be879b4fc007f1b3132f89e63b5))
* **internal:** upgrade eslint ([d9f4314](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/d9f431491e6b1984fa67e45020d292a7182fe5ee))
* **mcp:** remove deprecated tool schemes ([5e35240](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/5e352405b7c15547c437ef89c2742bfb5526af26))
* **mcp:** update lockfile ([73f0145](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/73f0145e6134bdb0759e338eaed6d79b0046ca86))
* use latest @modelcontextprotocol/sdk ([2451b8b](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/2451b8b7a57d3e3a74af32da2cff872f82b314be))


### Documentation

* prominently feature MCP server setup in root SDK readmes ([03aed7e](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/03aed7e8a142259978993a275875360aba48f648))

## 0.1.0 (2025-11-14)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/mpatankar/unofficial-demo-voyage-ai/compare/v0.0.1...v0.1.0)

### Features

* **api:** manual updates ([a4ce035](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/a4ce0351ef4c2baeca76b1c2b42ce24cdc6fb3cd))


### Chores

* configure new SDK language ([f32fc9c](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/f32fc9c8607f5b06f437201af72f1dbb80557c41))
* update SDK settings ([6f1cb27](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/6f1cb2724ff1e768833d7c9701ec1757abc0a240))
* update SDK settings ([4f6fa22](https://github.com/mpatankar/unofficial-demo-voyage-ai/commit/4f6fa22128f71941b8fedf1454f97eb81a31a88b))
