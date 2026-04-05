const REPO_URL = "https://github.com/deBUGger404/navexa";
const PYPI_URL = "https://pypi.org/project/navexa/";
const DOCS_URL = "https://debugger404.github.io/navexa-docs/";
const RELEASE_URL = `${REPO_URL}/blob/main/RELEASE.md`;

const BASE_URL = import.meta.env?.BASE_URL || "/navexa-docs/";
const asset = (fileName) => `${BASE_URL}${fileName}`;

const table = (headers, rows, options = {}) => ({ headers, rows, ...options });
const boolCell = (value, label = value ? "On" : "Off") => ({ kind: "bool", value, label });
const codeCell = (text) => ({ kind: "code", text });
const profileHeader = (text, caption, tone) => ({ kind: "profile_header", text, caption, tone });

const quickstartCode = `from navexa import index_structured_document_tree, save_document_tree

result = index_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="no-llm",
    parser_config={
        "name": "docling",
        "output_format": "markdown",
        "options": {"profile": "balanced"},
    },
)

saved = save_document_tree(
    result,
    out_dir="/absolute/path/out",
    write_tree=True,
    write_validation=True,
)

print(saved.paths["tree_navexa"])`;

const openAiModelConfig = `model_config = {
    "provider": "openai",
    "model": "gpt-4.1-mini",
    "api_key": "...",
    "base_url": None,
    "pricing_model": None,
}`;

const azureModelConfig = `model_config = {
    "provider": "azure",
    "model": "my-gpt41mini-deployment",
    "pricing_model": "gpt-4.1-mini",
    "api_key": "...",
    "base_url": "https://<resource>.openai.azure.com",
}`;

const parserConfigCode = `parser_config = {
    "name": "docling",
    "output_format": "markdown",
    "options": {
        "profile": "balanced",
        "do_ocr": True,
        "do_table_structure": True,
    },
}`;

const cliParserConfigJson = `{
  "name": "docling",
  "output_format": "markdown",
  "options": {
    "profile": "balanced",
    "do_ocr": true,
    "do_table_structure": true
  }
}`;

const treeSampleJson = `{
  "doc_id": "document",
  "doc_name": "document",
  "pages": { "count": 8 },
  "pipeline_version": "navexa-1.2.0",
  "source": {
    "pdf_path": "/absolute/path/document.pdf",
    "sha256": "9f4d...",
    "total_pages": 8
  },
  "cost": {
    "pricing_model": "gpt-4.1-mini",
    "calls": 3,
    "input_tokens": 2851,
    "output_tokens": 612,
    "total_tokens": 3463,
    "estimated_cost_usd": 0.002318
  },
  "pipeline": {
    "document_type": "structured",
    "requested_mode": "llm",
    "effective_mode": "llm",
    "llm_required": false,
    "summary_enabled": true,
    "model_config": {
      "provider": "openai",
      "model": "gpt-4.1-mini",
      "pricing_model": "gpt-4.1-mini",
      "api_key_configured": true,
      "base_url_configured": false,
      "source": "model_config"
    },
    "parser_config": {
      "name": "docling",
      "output_format": "markdown",
      "options": {
        "profile": "balanced",
        "do_ocr": true,
        "force_full_page_ocr": true,
        "backend": "torch",
        "do_table_structure": true,
        "do_picture_description": false,
        "enable_remote_services": false,
        "image_mode": "placeholder",
        "quiet": true
      }
    },
    "warnings": []
  },
  "structure": [
    {
      "node_id": "0001",
      "title": "Overview",
      "summary": "Top-level summary",
      "children": []
    }
  ]
}`;

const validationSampleJson = `{
  "generated_at": "2026-03-09T00:00:00+00:00",
  "pipeline_version": "navexa-1.2.0",
  "metrics": {
    "node_count": 18,
    "empty_node_rate": 0.0,
    "heading_anchor_match_rate": 1.0,
    "overlap_violations": 0,
    "duplicated_block_rate": 0.0,
    "summary_coverage": 0.83
  }
}`;

const searchTreeViewSample = `{
  "doc_id": "document",
  "structure": [
    {
      "node_id": "0001",
      "title": "Overview",
      "summary": "Top-level summary",
      "children": [
        {
          "node_id": "0001.0001",
          "title": "Scope",
          "summary": "Explains scope",
          "children": []
        }
      ]
    }
  ]
}`;

const nodeIndexSample = `{
  "0001.0001": {
    "node_id": "0001.0001",
    "title": "Scope",
    "summary": "Explains scope",
    "page_index": "2-3",
    "parent_id": "0001",
    "children": [],
    "exclusive_text": "Section text...",
    "full_text": "Section text..."
  }
}`;

const reasoningResultSample = `{
  "thinking": "The answer is likely in the setup and parser sections.",
  "node_list": ["0001.0002", "0002.0001"],
  "raw_response": "{...}",
  "used_prompt": null,
  "parsed_json": {
    "thinking": "The answer is likely in the setup and parser sections.",
    "node_list": ["0001.0002", "0002.0001"]
  }
}`;

const contextBundleSample = `{
  "node_list": ["0001.0002"],
  "dropped_node_list": ["0001"],
  "missing_node_list": [],
  "text_mode": "inclusive",
  "text": "Selected node text...",
  "node_records": [
    {
      "node_id": "0001.0002",
      "title": "Parser config",
      "page_index": "4-5",
      "text_length": 1842
    }
  ]
}`;

const ragResultSample = `{
  "tree": {...},
  "tree_view": {...},
  "node_index": {...},
  "reasoning": {...},
  "context": {...},
  "answer": {...},
  "cost_before": {...},
  "cost_after": {...},
  "cost_delta": {
    "calls": 2,
    "input_tokens": 1940,
    "output_tokens": 401,
    "total_tokens": 2341,
    "estimated_cost_usd": 0.001542
  }
}`;

function createArticle(section) {
  return {
    ...section,
    toc: buildArticleToc(section)
  };
}

function buildArticleToc(section) {
  const items = [];
  if (section.whatThisPageIsFor?.length) items.push({ id: "what-this-page-is-for", title: "What this page is for" });
  if (section.whenToUse?.length) items.push({ id: "when-to-use", title: "When to use it" });
  if (section.prerequisites?.length) items.push({ id: "before-you-start", title: "Before you start" });
  if (section.datasets?.length) items.push({ id: "data-type-examples", title: "Document type examples" });
  if (section.steps?.length) items.push({ id: "minimum-working-flow", title: section.stepsTitle || "Minimum working flow" });
  if (section.detailPages?.length) items.push({ id: "detail-pages", title: "Read more" });
  if (section.variablesTable?.rows?.length) items.push({ id: "variables", title: "Variables you usually change" });
  if (section.sampleOutput?.length) items.push({ id: "sample-output", title: "Sample output" });
  if (section.commonMistakes?.length) items.push({ id: "common-mistakes", title: "Common mistakes" });
  if (section.advancedOptions?.length) items.push({ id: "advanced-options", title: "Advanced options" });
  if (section.deprecatedNotes?.length) items.push({ id: "deprecated-notes", title: "Deprecated notes" });
  if (section.tryIt?.length) items.push({ id: "try-it", title: "Try it" });
  if (section.nextSteps?.length) items.push({ id: "next-steps", title: "Next steps" });
  return items;
}

function next(title, to, body = "") {
  return { title, to, body };
}

const rawSections = [
  {
    id: "overview",
    category: "Get started",
    title: "Navexa Library Docs",
    productsTitle: "Capabilities",
    description:
      "Navexa documentation for PDF document processing, structured indexing, hierarchy-aware retrieval, grounded RAG pipelines, parser configuration, transcript workflows, and production-ready document trees.",
    heroCode: {
      title: "First successful index",
      language: "python",
      code: quickstartCode
    },
    products: [
      {
        title: "Structured Indexing",
        description: "Build hierarchy-aware trees with clean section boundaries.",
        image: asset("image1.png"),
        to: "/docs/data-structured"
      },
      {
        title: "Reasoning Retrieval",
        description: "Select the right nodes before generating grounded answers.",
        image: asset("image2.png"),
        to: "/docs/reasoning"
      },
      {
        title: "Transcript Understanding",
        description: "Group transcript segments into topics with strong traceability.",
        image: asset("image3.png"),
        to: "/docs/data-transcript"
      }
    ],
    toc: [
      { id: "hero-quickstart", title: "Current quickstart" },
      { id: "products", title: "Capabilities" }
    ]
  },
  createArticle({
    id: "install",
    category: "Get started",
    title: "Install and Verify",
    description:
      "Set up one clean environment, confirm the package and CLI work, and create a simple baseline before you tune anything else.",
    whatThisPageIsFor: [
      "Get Navexa installed in one clean Python environment.",
      "Verify the package import and the `navexa-index` command before reading the deeper guides."
    ],
    whenToUse: [
      "You are starting on a new machine, notebook kernel, or virtual environment.",
      "You are seeing `ModuleNotFoundError`, PATH issues, or a missing CLI command.",
      "You want a clean baseline before parser or LLM setup."
    ],
    prerequisites: [
      "Python 3.10 or newer",
      "Terminal access",
      "One sample PDF file",
      "Write access to an output directory"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Create one clean environment and install Navexa",
        body: "Keep the first setup simple so the CLI and the Python package both point to the same interpreter.",
        language: "bash",
        code: `python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U pip
python -m pip install -U navexa`
      },
      {
        title: "Verify the import and the CLI",
        body: "Confirm the package import and the CLI entrypoint from the same environment before indexing real files.",
        language: "bash",
        code: `python - <<'PY'
import navexa
print("import_ok")
print(navexa.__file__)
PY

which navexa-index
navexa-index --help`
      },
      {
        title: "Run one smoke command",
        body: "Use one structured no-LLM run first. It isolates install, file-path, and output-directory issues from parser or LLM setup.",
        language: "bash",
        code: `navexa-index
  --pdf /absolute/path/document.pdf
  --out-dir /absolute/path/out
  --document-type structured
  --mode no-llm
  --with-validation`
      }
    ],
    detailPages: [
      next(
        "Quickstart: Index Your First PDF",
        "/docs/quickstart",
        "Run the first structured workflow, save the outputs, and inspect the main pipeline fields."
      ),
      next(
        "parser_config (recommended)",
        "/docs/parser-config",
        "Learn the Docling profiles, option meanings, and the current grouped parser API."
      ),
      next(
        "Environment and LLM Setup",
        "/docs/env",
        "Add provider credentials only after the baseline install and smoke run are stable."
      )
    ],
    commonMistakes: [
      {
        mistake: "Mixing notebook Python and terminal Python",
        fix: "Print `navexa.__file__` and `sys.executable` inside the notebook and compare them to your terminal environment."
      },
      {
        mistake: "Skipping the no-LLM smoke run",
        fix: "Start with one structured no-LLM run so file path and parser problems are isolated before LLM setup."
      }
    ],
    advancedOptions: [
      {
        title: "More setup paths",
        body: "Open these only when the standard PyPI install is not enough for your environment.",
        moreDetails: [
          {
            title: "Notebook extra",
            body: "Use the notebook extra only when you need widget support in Jupyter.",
            language: "bash",
            code: `python -m pip install -U "navexa[notebook]"`
          },
          {
            title: "Editable install or GitHub source",
            body: "Use one of these paths when you are developing against a local clone or a repository version instead of the published package.",
            language: "bash",
            code: `cd /path/to/navexa
python -m pip install -e .

python -m pip install git+https://github.com/deBUGger404/navexa.git`
          }
        ]
      }
    ],
    tryIt: [
      "Run the import check from the same shell where you installed Navexa.",
      "Run `navexa-index --help` in the same environment.",
      "Generate one `tree_navexa.json` before moving on."
    ],
    nextSteps: [
      next("Quickstart: Index Your First PDF", "/docs/quickstart", "Use the Python wrapper next so you can read the returned result and saved files together."),
      next("CLI Commands", "/docs/cli", "Use the CLI reference later when you want the full command surface.")
    ],
    links: [
      { label: "PyPI project page", href: PYPI_URL },
      { label: "Release notes", href: RELEASE_URL }
    ]
  }),
  createArticle({
    id: "quickstart",
    category: "Get started",
    title: "Quickstart: Index Your First PDF",
    description:
      "Run one small structured workflow, save the canonical outputs, and learn just enough to move into the detailed pages.",
    whatThisPageIsFor: [
      "Get one successful end-to-end run with the supported Python API.",
      "Learn the main outputs without repeating the full structured-data reference here."
    ],
    whenToUse: [
      "You have Navexa installed and want the first clean example.",
      "You want to confirm the save flow before reading the deeper reference pages.",
      "You want one example that works without LLM credentials."
    ],
    prerequisites: [
      "Navexa installed successfully",
      "One local PDF file",
      "An output directory path you can write to"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Index one structured PDF in no-LLM mode",
        body: "Use the stable structured wrapper first. This is the shortest baseline before you learn the detailed indexing pages.",
        language: "python",
        code: `from navexa import index_structured_document_tree

result = index_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="no-llm",
    parser_config={
        "name": "docling",
        "output_format": "markdown",
        "options": {"profile": "balanced"},
    },
    verbosity="medium",
)

print(result.meta["document_type"])
print(result.meta["effective_mode"])`
      },
      {
        title: "Save the canonical outputs",
        body: "Keep `tree_navexa.json` as the main artifact. Add validation so you can inspect the output quality later.",
        language: "python",
        code: `from navexa import save_document_tree

saved = save_document_tree(
    result,
    out_dir="/absolute/path/out",
    write_tree=True,
    write_validation=True,
)

print(saved.paths["tree_navexa"])
print(saved.paths["validation_report"])`
      },
      {
        title: "Inspect the output fields that matter first",
        body: "Read the pipeline metadata first. That gives you the mode, parser settings, and warnings without reading the full tree.",
        language: "python",
        code: `tree = result.tree_navexa

print(tree["pipeline"]["document_type"])
print(tree["pipeline"]["requested_mode"])
print(tree["pipeline"]["effective_mode"])
print(tree["pipeline"]["parser_config"])
print(tree["pipeline"]["warnings"])`
      }
    ],
    detailPages: [
      next(
        "Structured data",
        "/docs/data-structured",
        "Read the full structured-wrapper guide, including the optional LLM path and the parameters that actually matter."
      ),
      next(
        "Save and Load Trees",
        "/docs/save-fetch",
        "See the full save, reload, validation, and compatibility workflow after the first run works."
      ),
      next(
        "Output Schema (Canonical)",
        "/docs/output-schema",
        "Use the schema page when you want the full meaning of the saved JSON keys."
      )
    ],
    variablesTable: table(
      ["Field", "What it controls", "Typical values"],
      [
        ["pdf_path", "Input document location", "/absolute/path/document.pdf"],
        ["mode", "Whether Navexa should try to use LLM", "`no-llm` or `llm`"],
        ["parser_config", "Current grouped parser settings", "{ name, output_format, options }"]
      ]
    ),
    sampleOutput: [
      {
        title: "tree_navexa pipeline excerpt",
        body: "This is the first part of the saved tree most users should inspect.",
        language: "json",
        code: `{
  "pipeline": {
    "document_type": "structured",
    "requested_mode": "no-llm",
    "effective_mode": "no-llm",
    "summary_enabled": true,
    "parser_config": {
      "name": "docling",
      "output_format": "markdown",
      "options": {
        "profile": "balanced"
      }
    },
    "warnings": []
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: "Assuming `requested_mode` and `effective_mode` are always the same",
        fix: "Read both fields. Optional-LLM flows can fall back to effective `no-llm` when you did not actually enable a working model path."
      },
      {
        mistake: "Reading only the saved tree and ignoring the returned result object",
        fix: "Use `result.meta` first for quick sanity checks, then inspect `tree_navexa.json` for full detail."
      }
    ],
    advancedOptions: [
      {
        title: "More about helpers and lighter output",
        body: "Open these only after the first run works. They are useful, but they are not required for the first quickstart.",
        moreDetails: [
          {
            title: "Use the one-call save helper",
            language: "python",
            code: `from navexa import index_and_save_document_tree

index_result, save_result = index_and_save_document_tree(
    pdf_path="/absolute/path/document.pdf",
    out_dir="/absolute/path/out",
    mode="no-llm",
    parser_config={
        "name": "docling",
        "output_format": "markdown",
        "options": {"profile": "balanced"},
    },
    write_tree=True,
    write_validation=True,
)`
          },
          {
            title: "Disable node summaries for a lighter tree",
            body: "Use this only when you already know you do not need summary fields in the output tree.",
            language: "python",
            code: `result = index_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="no-llm",
    if_add_node_summary="no",
)`
          }
        ]
      }
    ],
    tryIt: [
      "Run the quickstart once with `mode=\"no-llm\"`.",
      "Open `tree_navexa.json` and find `pipeline.requested_mode` and `pipeline.effective_mode`.",
      "Then move to the detailed structured-data page before adding more options."
    ],
    nextSteps: [
      next("Environment and LLM Setup", "/docs/env", "Use this only when the no-LLM baseline is already stable."),
      next("Types of Data Navexa Handles", "/docs/indexing-modes", "Use the decision map to choose the right wrapper for the next document family.")
    ],
    links: [
      { label: "Package source", href: REPO_URL },
      { label: "Live docs home", href: DOCS_URL }
    ]
  }),
  createArticle({
    id: "env",
    category: "Get started",
    title: "Environment and LLM Setup",
    description:
      "Choose a clean provider setup, decide between env defaults and `model_config`, and keep the rest of the detail in the deeper pages that use it.",
    whatThisPageIsFor: [
      "Set up the current LLM configuration path without burying the main indexing and reasoning guides in provider setup.",
      "Show the difference between env defaults and explicit `model_config`."
    ],
    whenToUse: [
      "You are turning on LLM indexing or any reasoning function.",
      "You want reproducible model selection in code or shared defaults in a shell environment.",
      "You are moving older `model=...` examples toward `model_config`."
    ],
    prerequisites: [
      "A provider decision: `openai` or `azure`",
      "A valid API key",
      "A model or deployment name"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Choose your config style",
        body: "Use env variables when you want one shared default across runs. Use `model_config` when you want the model setup visible right next to the call site.",
        bullets: [
          "Use env defaults for local development shells or shared notebook kernels.",
          "Use `model_config` when you want the example to be fully self-contained in Python code.",
          "Do not teach `model=` in new examples."
        ]
      },
      {
        title: "Set one provider baseline",
        body: "OpenAI is the smallest baseline example. If you use Azure instead, open the detail block below and swap in the Azure fields.",
        language: "bash",
        code: `export NAVEXA_LLM_PROVIDER="openai"
export OPENAI_API_KEY="..."
export OPENAI_MODEL_NAME="gpt-4.1-mini"`,
        moreDetails: [
          {
            title: "Azure OpenAI environment variables",
            body: "You can provide the Azure resource URL directly. Navexa adds `/openai/v1` when the resource path does not already contain it.",
            language: "bash",
            code: `export NAVEXA_LLM_PROVIDER="azure"
export AZURE_OPENAI_API_KEY="..."
export AZURE_OPENAI_BASE_URL="https://<resource>.openai.azure.com"
export AZURE_DEPLOYMENT_NAME="my-gpt41mini-deployment"
export AZURE_DEPLOYMENT_RAW_NAME="gpt-4.1-mini"`
          }
        ]
      },
      {
        title: "Use model_config directly in code",
        body: "This is the preferred explicit API path when you want the model settings next to the call site.",
        language: "python",
        code: `${openAiModelConfig}

result = index_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="llm",
    model_config=model_config,
)`
      }
    ],
    detailPages: [
      next(
        "Structured data",
        "/docs/data-structured",
        "See how `model_config` is used in the normal structured indexing flow after the provider setup is ready."
      ),
      next(
        "Transcript data",
        "/docs/data-transcript",
        "Use this page when you want the clearest example of an indexing wrapper that is always LLM-required."
      ),
      next(
        "Reasoning Retrieval Workflow",
        "/docs/reasoning",
        "Reuse the same provider setup for grounded question answering over saved trees."
      )
    ],
    variablesTable: table(
      ["Field", "Meaning", "Typical values"],
      [
        ["provider", "LLM provider switch", "`openai` or `azure`"],
        ["model", "OpenAI model name or Azure deployment name", "`gpt-4.1-mini`, `my-deployment`"],
        ["api_key", "Credential used by the selected provider", "provider API key string"],
        ["base_url", "Azure endpoint or compatible custom base URL", "`https://<resource>.openai.azure.com`"],
        ["pricing_model", "Optional billing label, mostly useful for Azure custom deployments", "`gpt-4.1-mini`"]
      ]
    ),
    sampleOutput: [
      {
        title: "Serialized model metadata in the saved tree",
        body: "Navexa writes safe model metadata to output. Secrets are not written.",
        language: "json",
        code: `{
  "model_config": {
    "provider": "azure",
    "model": "my-gpt41mini-deployment",
    "pricing_model": "gpt-4.1-mini",
    "api_key_configured": true,
    "base_url_configured": true,
    "source": "model_config"
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: "Setting Azure credentials while `NAVEXA_LLM_PROVIDER` still points to OpenAI",
        fix: "Always set the provider first, then provide the matching credentials and model/deployment fields."
      },
      {
        mistake: "Thinking Azure base_url must already contain `/openai/v1`",
        fix: "It is allowed, but not required. Navexa normalizes the Azure resource URL for you when needed."
      }
    ],
    advancedOptions: [
      {
        title: "More provider and compatibility details",
        body: "Open these only when you need provider-specific or migration-specific behavior.",
        moreDetails: [
          {
            title: "Recommended model_config shapes",
            body: "These are the grouped shapes to teach first in Python examples.",
            language: "python",
            code: `${openAiModelConfig}

${azureModelConfig}`
          },
          {
            title: "Use NAVEXA_ENV_FILE for a dedicated env file",
            language: "bash",
            code: `export NAVEXA_ENV_FILE="/absolute/path/to/.env"`
          },
          {
            title: "Current model resolution order",
            body: "Current runtime still honors the deprecated `model=` override first for compatibility. Keep that in mind when you debug older examples.",
            language: "text",
            code: `Current runtime order:
1. deprecated explicit model=
2. model_config["model"]
3. OPENAI_MODEL_NAME or AZURE_DEPLOYMENT_NAME`
          }
        ]
      }
    ],
    deprecatedNotes: [
      {
        title: "Legacy model argument",
        body: "The public wrappers still accept `model=...`, but that path is deprecated. Use `model_config={...}` in examples and new code."
      }
    ],
    tryIt: [
      "Set one provider path and verify it with a single `mode=\"llm\"` call.",
      "Inspect `tree_navexa.pipeline.model_config` after saving a run.",
      "Only keep `model=` in old migration code, not in new examples."
    ],
    nextSteps: [
      next("Types of Data Navexa Handles", "/docs/indexing-modes", "Use the wrapper decision page before you index a new document family."),
      next("Reasoning Retrieval Workflow", "/docs/reasoning", "Move here once the provider setup is stable and you want grounded question answering.")
    ],
    links: [
      { label: "PyPI project page", href: PYPI_URL },
      { label: "Release notes", href: RELEASE_URL }
    ]
  }),
  createArticle({
    id: "indexing-modes",
    category: "Core concepts",
    title: "Types of Data Navexa Handles",
    description:
      "Use this page as a decision map. Pick the wrapper that matches the document shape first, then learn the subtype page for the variables that actually matter for that flow.",
    whatThisPageIsFor: [
      "Choose the correct indexing wrapper before tuning parser or model settings.",
      "Understand which flows are optional-LLM and which are strictly LLM-required.",
      "See which document types actually use parser_config and Docling."
    ],
    whenToUse: [
      "You are starting a new indexing integration.",
      "You are unsure whether a PDF should be treated as structured, semi-structured, unstructured, or transcript.",
      "You want the shortest mental model before diving into each subtype page."
    ],
    datasets: [
      {
        title: "Structured data",
        description: "Manuals, policy docs, reports, and other PDFs with reliable headings.",
        image: asset("type1.png"),
        to: "/docs/data-structured"
      },
      {
        title: "Semi-structured data",
        description: "Documents with inconsistent headings or mixed structure that still benefit from section recovery.",
        image: asset("type2.png"),
        to: "/docs/data-semi-structured"
      },
      {
        title: "Unstructured data",
        description: "Long text without a dependable heading hierarchy.",
        image: asset("type3.png"),
        to: "/docs/data-unstructured"
      },
      {
        title: "Transcript data",
        description: "Calls, interviews, and conversation-heavy documents grouped by topic.",
        image: asset("type4.png"),
        to: "/docs/data-transcript"
      }
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Match the wrapper to document shape",
        body: "Start from structure, not from model settings. The wrapper decides the indexing strategy."
      },
      {
        title: "Choose mode deliberately",
        body: "Structured, semi-structured, and unstructured flows can all run without LLM. Transcript is the only indexing flow that is strictly LLM-required."
      },
      {
        title: "Only configure parser settings when the flow uses Docling",
        body: "Structured, semi-structured, and unstructured flows use parser_config. Transcript does not use the Docling parser path in the public wrapper."
      }
    ],
    variablesTable: table(
      ["Wrapper", "Best fit", "LLM requirement", "Parser config relevance"],
      [
        ["index_structured_document_tree", "Clear headings and normal document hierarchy", "Optional", "Yes"],
        ["index_semi_structured_document_tree", "Messy or partial headings", "Optional", "Yes"],
        ["index_unstructured_document_tree", "Heading-poor text", "Optional", "Yes"],
        ["index_transcript_document_tree", "Calls, interviews, meetings", "Required", "No"]
      ]
    ),
    commonMistakes: [
      {
        mistake: "Using transcript mode for formal manuals or reports",
        fix: "Choose transcript only for conversation-style documents. Start with structured or semi-structured for normal PDFs."
      },
      {
        mistake: "Assuming semi-structured still requires LLM",
        fix: "That was older behavior. Current code supports both `no-llm` and `llm` for semi-structured indexing."
      }
    ],
    advancedOptions: [
      {
        title: "Read requested_mode and effective_mode together",
        body: "Those fields tell you what you asked for and what Navexa actually used after validation.",
        language: "json",
        code: `{
  "requested_mode": "llm",
  "effective_mode": "no-llm"
}`
      }
    ],
    tryIt: [
      "Pick one real PDF and decide the wrapper before touching parser settings.",
      "Read the subtype page that matches your wrapper next.",
      "Keep transcript separate from the Docling parser mental model."
    ],
    nextSteps: [
      next("Structured data", "/docs/data-structured"),
      next("Parser Parameter Setup", "/docs/parser-setup")
    ],
    links: [{ label: "Package source", href: REPO_URL }]
  }),
  createArticle({
    id: "data-structured",
    category: "Core concepts",
    navParentId: "indexing-modes",
    title: "Structured data",
    description:
      "Use this flow for PDFs with stable headings and a mostly reliable document hierarchy. It is the best default for your first successful index.",
    whatThisPageIsFor: [
      "Teach the default indexing wrapper for normal heading-based documents.",
      "Show the clean no-LLM baseline and the optional LLM upgrade path.",
      "Highlight the fields that matter most for structured runs."
    ],
    whenToUse: [
      "Manuals, policy documents, research-style PDFs, and reports with usable headings",
      "You want the most stable first run",
      "You want parser_config and Docling options to matter"
    ],
    prerequisites: [
      "A heading-based PDF",
      "A parser profile choice if you need OCR/table tuning",
      "Optional LLM settings only if you want `mode=\"llm\"`"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Run the baseline structured index",
        body: "Start with a deterministic run and only add LLM after you have a good tree shape.",
        language: "python",
        code: `from navexa import index_structured_document_tree

result = index_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="no-llm",
    parser_config={
        "name": "docling",
        "output_format": "markdown",
        "options": {"profile": "balanced"},
    },
)`
      },
      {
        title: "Save and inspect the result",
        body: "Check the saved tree first, especially the parser metadata and top-level structure.",
        language: "python",
        code: `from navexa import save_document_tree

saved = save_document_tree(result, "/absolute/path/out", write_tree=True, write_validation=True)
print(saved.paths["tree_navexa"])`
      },
      {
        title: "Optional: upgrade to LLM mode",
        body: "Once the no-LLM baseline is stable, use `model_config` for the LLM-enhanced path.",
        language: "python",
        code: `result = index_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="llm",
    model_config={
        "provider": "openai",
        "model": "gpt-4.1-mini",
        "api_key": "...",
    },
    parser_config={
        "name": "docling",
        "output_format": "markdown",
        "options": {"profile": "balanced"},
    },
)`
      }
    ],
    variablesTable: table(
      ["Field", "Why you change it", "Typical values"],
      [
        ["mode", "Control LLM usage", "`no-llm` first, `llm` later"],
        ["parser_config", "Current parser tuning path", "{ name, output_format, options }"],
        ["max_token_num_each_node", "Split large nodes by token budget", "12000 by default"],
        ["max_page_num_each_node", "Split large nodes by page budget", "8 by default"],
        ["if_add_node_summary", "Keep or drop summary fields", "`yes` or `no`"]
      ]
    ),
    sampleOutput: [
      {
        title: "Structured run output excerpt",
        body: "Structured runs record the resolved parser config and mode metadata in the canonical JSON.",
        language: "json",
        code: `{
  "pipeline": {
    "document_type": "structured",
    "requested_mode": "no-llm",
    "effective_mode": "no-llm",
    "parser_config": {
      "name": "docling",
      "output_format": "markdown",
      "options": {
        "profile": "balanced"
      }
    }
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: "Starting with LLM before you know the structure is sound",
        fix: "Run one no-LLM baseline first and inspect the top-level nodes before paying for LLM work."
      },
      {
        mistake: "Requesting `output_format=\"text\"` and expecting a normal structured heading tree",
        fix: "Current code forces structured output back to markdown because the structured flow depends on heading-aware parsing."
      }
    ],
    advancedOptions: [
      {
        title: "Skip summaries for a lighter tree",
        body: "If you set `if_add_node_summary=\"no\"`, Navexa omits summary fields from nodes instead of leaving stale empty placeholders.",
        language: "python",
        code: `result = index_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="no-llm",
    if_add_node_summary="no",
)`
      }
    ],
    deprecatedNotes: [
      {
        title: "Legacy flat parser args",
        body: "The wrapper still accepts `parser_model`, `output_format`, and `docling_options`, but new examples should use `parser_config={...}` first."
      }
    ],
    tryIt: [
      "Run one structured no-LLM index.",
      "Inspect the saved parser metadata in `tree_navexa.json`.",
      "Only then compare it to an LLM-enabled rerun."
    ],
    nextSteps: [
      next("Semi-structured data", "/docs/data-semi-structured"),
      next("Parser Parameter Setup", "/docs/parser-setup")
    ]
  }),
  createArticle({
    id: "data-semi-structured",
    category: "Core concepts",
    navParentId: "indexing-modes",
    title: "Semi-structured data",
    description:
      "Use this flow when headings exist but are inconsistent, incomplete, or too weak for a normal structured run. Current code supports both `no-llm` and `llm` here.",
    whatThisPageIsFor: [
      "Show the current semi-structured wrapper behavior instead of the older LLM-required assumption.",
      "Teach the safe baseline: run without LLM first, then add LLM only if heading recovery needs help.",
      "Explain the semi-structured prompt hook without making it the default path."
    ],
    whenToUse: [
      "Messy reports, scanned policies, or PDFs with uneven heading quality",
      "The document is not truly unstructured, but the heading tree is not reliable enough for the normal structured wrapper",
      "You want optional LLM assistance instead of mandatory LLM"
    ],
    prerequisites: [
      "A document with weak or inconsistent headings",
      "Parser settings if OCR or table behavior matters",
      "Optional LLM settings only if you want LLM-assisted heading recovery"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Run a no-LLM baseline first",
        body: "Current code supports this. Use it to see how much structure Navexa can recover deterministically.",
        language: "python",
        code: `from navexa import index_semi_structured_document_tree

result = index_semi_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="no-llm",
    parser_config={
        "name": "docling",
        "output_format": "markdown",
        "options": {"profile": "balanced"},
    },
)`
      },
      {
        title: "Enable LLM only when heading recovery needs help",
        body: "LLM acts as an enhancer for weak outlines. It is not the only supported path anymore.",
        language: "python",
        code: `result = index_semi_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="llm",
    model_config={
        "provider": "openai",
        "model": "gpt-4.1-mini",
        "api_key": "...",
    },
    parser_config={
        "name": "docling",
        "output_format": "markdown",
        "options": {"profile": "balanced"},
    },
)`
      },
      {
        title: "Customize heading extraction only when you truly need it",
        body: "The prompt hook is there for difficult documents, but keep the default prompt until you have a reproducible reason to change it.",
        language: "python",
        code: `result = index_semi_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="llm",
    model_config={
        "provider": "openai",
        "model": "gpt-4.1-mini",
        "api_key": "...",
    },
    semi_heading_prompt_template="Custom prompt text here...",
)`
      }
    ],
    variablesTable: table(
      ["Field", "Why you change it", "Typical values"],
      [
        ["mode", "Choose deterministic or LLM-assisted heading recovery", "`no-llm` or `llm`"],
        ["model_config", "Only needed for LLM-assisted runs", "{ provider, model, api_key, base_url, pricing_model }"],
        ["parser_config", "Parser control for the document extraction stage", "{ name, output_format, options }"],
        ["semi_heading_prompt_template", "Advanced custom heading prompt", "custom string"],
        ["if_add_node_summary", "Keep or remove summary fields", "`yes` or `no`"]
      ]
    ),
    sampleOutput: [
      {
        title: "Semi-structured pipeline excerpt",
        body: "Semi-structured runs expose where the effective headings came from.",
        language: "json",
        code: `{
  "pipeline": {
    "document_type": "semi_structured",
    "requested_mode": "llm",
    "effective_mode": "llm",
    "semi_structured_source": "llm",
    "verify_accuracy": 1.0
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: "Teaching semi-structured as LLM-required",
        fix: "Current code does not require that. Start with `mode=\"no-llm\"` unless you know you need the enhancer."
      },
      {
        mistake: "Using transcript for messy documents that are still document-shaped",
        fix: "Transcript is for conversation-style content. Semi-structured is the correct choice for weak document headings."
      }
    ],
    advancedOptions: [
      {
        title: "Compare the same file in no-LLM and LLM mode",
        body: "This is the fastest way to decide whether the LLM enhancer is worth keeping for that document family."
      }
    ],
    deprecatedNotes: [
      {
        title: "Older wrapper behavior is outdated",
        body: "If you see docs or examples claiming that semi-structured raises immediately without LLM, treat them as stale."
      }
    ],
    tryIt: [
      "Run the same semi-structured PDF once in `no-llm` and once in `llm`.",
      "Compare `semi_structured_source` and top-level sections.",
      "Keep the cheaper path if the structure quality is already acceptable."
    ],
    nextSteps: [
      next("Unstructured data", "/docs/data-unstructured"),
      next("Parser config (recommended)", "/docs/parser-config")
    ]
  }),
  createArticle({
    id: "data-unstructured",
    category: "Core concepts",
    navParentId: "indexing-modes",
    title: "Unstructured data",
    description:
      "Use this flow for long text with weak or missing headings. Parser settings still matter here, but the document is segmented more like content blocks than a classic heading tree.",
    whatThisPageIsFor: [
      "Show the correct wrapper for text-heavy documents with poor heading structure.",
      "Keep the current-first workflow: baseline run, save output, then optional LLM upgrade.",
      "Explain the node size controls that matter more for this flow."
    ],
    whenToUse: [
      "The document has little usable heading structure",
      "You care more about chunk quality than heading fidelity",
      "You still want canonical Navexa tree output and later reasoning"
    ],
    prerequisites: [
      "A text-heavy PDF",
      "A parser configuration if OCR or output format matters",
      "Optional LLM settings only if you want LLM-assisted sectioning"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Run the unstructured index",
        body: "This wrapper is built for documents where heading recovery is not the main strategy.",
        language: "python",
        code: `from navexa import index_unstructured_document_tree

result = index_unstructured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="no-llm",
    parser_config={
        "name": "docling",
        "output_format": "text",
        "options": {"profile": "fast_text"},
    },
)`
      },
      {
        title: "Tune node size before you tune anything else",
        body: "Large unstructured documents often benefit more from node-size control than from parser micro-optimizations.",
        language: "python",
        code: `result = index_unstructured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="no-llm",
    max_token_num_each_node=8000,
    max_page_num_each_node=4,
)`
      },
      {
        title: "Save the tree and reuse it later",
        body: "The unstructured flow still produces the same canonical tree and save/fetch workflow as the other wrappers.",
        language: "python",
        code: `from navexa import save_document_tree, fetch_document_tree

save_document_tree(result, "/absolute/path/out", write_tree=True, write_validation=True)
tree = fetch_document_tree("/absolute/path/out")`
      }
    ],
    variablesTable: table(
      ["Field", "Why you change it", "Typical values"],
      [
        ["parser_config.output_format", "Choose parser text style", "`text` or `markdown`"],
        ["max_token_num_each_node", "Limit node token size", "12000 default, lower for tighter chunks"],
        ["max_page_num_each_node", "Limit node page span", "8 default, lower for tighter chunks"],
        ["mode", "Optional LLM sectioning path", "`no-llm` or `llm`"],
        ["if_add_node_summary", "Keep or drop summaries", "`yes` or `no`"]
      ]
    ),
    sampleOutput: [
      {
        title: "Unstructured output excerpt",
        body: "The wrapper still records the resolved parser config and effective mode like the other flows.",
        language: "json",
        code: `{
  "pipeline": {
    "document_type": "unstructured",
    "requested_mode": "no-llm",
    "effective_mode": "no-llm",
    "parser_config": {
      "name": "docling",
      "output_format": "text",
      "options": {
        "profile": "fast_text"
      }
    }
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: "Treating a heading-poor PDF as structured just because it has page titles",
        fix: "If the document does not have a dependable hierarchy, start with the unstructured wrapper instead."
      },
      {
        mistake: "Keeping very large node sizes by default on every long document",
        fix: "Tune token and page limits when the text density is high and you want cleaner reasoning chunks."
      }
    ],
    advancedOptions: [
      {
        title: "Use text output when heading markup is not useful",
        body: "Unlike structured and semi-structured flows, unstructured can genuinely benefit from `output_format=\"text\"`."
      }
    ],
    tryIt: [
      "Run the same unstructured PDF once with `output_format=\"text\"` and once with `output_format=\"markdown\"`.",
      "Lower `max_token_num_each_node` and inspect the resulting node granularity.",
      "Save the tree and load it again with `fetch_document_tree`."
    ],
    nextSteps: [
      next("Transcript data", "/docs/data-transcript"),
      next("Save and Load Trees", "/docs/save-fetch")
    ]
  }),
  createArticle({
    id: "data-transcript",
    category: "Core concepts",
    navParentId: "indexing-modes",
    title: "Transcript data",
    description:
      "Use this flow for calls, interviews, and conversation-heavy documents. Transcript indexing is the only indexing wrapper that is strictly LLM-required.",
    whatThisPageIsFor: [
      "Teach the transcript wrapper exactly as the current public API exposes it.",
      "Make it clear that transcript indexing is LLM-required.",
      "Separate transcript behavior from parser_config and Docling mental models."
    ],
    whenToUse: [
      "Call transcripts, interview transcripts, meeting notes exported as PDF",
      "Conversation-style documents where topic grouping matters more than headings",
      "You want topic-level structure with traceable source text"
    ],
    prerequisites: [
      "A transcript-style PDF",
      "A working LLM provider configuration",
      "An understanding that parser_config is not part of the public wrapper here"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Configure LLM first",
        body: "Transcript is fail-fast when model or credentials are missing because current code marks it as LLM-required.",
        language: "python",
        code: `model_config = {
    "provider": "openai",
    "model": "gpt-4.1-mini",
    "api_key": "...",
}`
      },
      {
        title: "Run the transcript wrapper",
        body: "Notice the public wrapper signature: no parser args are exposed here.",
        language: "python",
        code: `from navexa import index_transcript_document_tree

result = index_transcript_document_tree(
    pdf_path="/absolute/path/transcript.pdf",
    model_config=model_config,
    verbosity="medium",
)`
      },
      {
        title: "Save and inspect topic structure",
        body: "The canonical tree still saves the same way, but transcript runs can also include a top-level \`transcript\` payload.",
        language: "python",
        code: `from navexa import save_document_tree

saved = save_document_tree(
    result,
    out_dir="/absolute/path/out",
    write_tree=True,
    write_validation=True,
)

print(saved.paths["tree_navexa"])`
      }
    ],
    variablesTable: table(
      ["Field", "Why you change it", "Typical values"],
      [
        ["pdf_path", "Input transcript PDF", "/absolute/path/transcript.pdf"],
        ["model_config", "Required LLM path", "{ provider, model, api_key, base_url, pricing_model }"],
        ["verbosity", "Runtime logging", "`low`, `medium`, `high`"],
        ["max_token_num_each_node", "Topic chunk size budget", "12000 default"],
        ["max_page_num_each_node", "Topic page span budget", "8 default"],
        ["transcript_topic_prompt_template", "Advanced custom topic prompt", "custom string"]
      ]
    ),
    sampleOutput: [
      {
        title: "Transcript output excerpt",
        body: "Current code marks transcript as LLM-required and can include an extra top-level transcript payload in the output.",
        language: "json",
        code: `{
  "pipeline": {
    "document_type": "transcript",
    "llm_required": true,
    "requested_mode": "llm",
    "effective_mode": "llm",
    "parser_config": null,
    "warnings": []
  },
  "transcript": {
    "topics": [
      {
        "topic": "Intro",
        "summary": "Conversation opening"
      }
    ]
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: "Expecting parser_config or Docling flags to change transcript behavior",
        fix: "The transcript wrapper does not expose parser args in Python, and transcript CLI runs ignore parser config and legacy parser flags."
      },
      {
        mistake: "Treating transcript as optional-LLM like the other wrappers",
        fix: "Transcript is the exception. It requires a working model and credentials."
      }
    ],
    advancedOptions: [
      {
        title: "Customize transcript topic extraction",
        body: "Use the prompt hook only when the default topic grouping is not good enough for your transcript family.",
        language: "python",
        code: `result = index_transcript_document_tree(
    pdf_path="/absolute/path/transcript.pdf",
    model_config=model_config,
    transcript_topic_prompt_template="Custom transcript topic prompt...",
)`
      }
    ],
    deprecatedNotes: [
      {
        title: "Older transcript parameter tables are stale",
        body: "If you see docs listing \`parser_model\`, \`output_format\`, or \`docling_options\` under the public transcript wrapper, treat those examples as outdated."
      }
    ],
    tryIt: [
      "Run one transcript file with a working `model_config`.",
      "Confirm `llm_required` is `true` in the saved output.",
      "Do not copy parser examples from the other wrappers into the transcript wrapper."
    ],
    nextSteps: [
      next("Parser Parameter Setup", "/docs/parser-setup"),
      next("Save and Load Trees", "/docs/save-fetch")
    ]
  }),
  createArticle({
    id: "parser-setup",
    category: "Core concepts",
    title: "Parser Parameter Setup",
    description:
      "This section covers parser control for structured, semi-structured, and unstructured flows. Start with `parser_config`, then use environment defaults if you need shared runtime behavior, and keep legacy parser args only for compatibility.",
    whatThisPageIsFor: [
      "Explain parser settings without mixing them into transcript behavior.",
      "Teach the recommended grouped parser_config shape before any legacy flat args.",
      "Give one stable mental model for profile defaults, env defaults, and per-run overrides."
    ],
    whenToUse: [
      "You are working with structured, semi-structured, or unstructured indexing.",
      "You need to tune OCR, table extraction, image mode, or logging.",
      "You want to know where parser defaults come from."
    ],
    prerequisites: [
      "A non-transcript indexing wrapper",
      "A decision on whether you want per-run config or shared env defaults",
      "A willingness to keep legacy parser args at the end of your migration path"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Start with parser_config in the function call",
        body: "This keeps parser behavior explicit at the same place where you call the wrapper.",
        language: "python",
        code: `${parserConfigCode}

result = index_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    parser_config=parser_config,
)`
      },
      {
        title: "Use environment variables only for shared defaults",
        body: "Environment values are helpful when many runs should inherit the same parser baseline."
      },
      {
        title: "Keep legacy parser args only for migration work",
        body: "Current code still accepts old flat parser args, but the modern grouped form is easier to understand and maintain."
      }
    ],
    variablesTable: table(
      ["parser_config key", "Meaning", "Example"],
      [
        ["name", "Parser backend name", "`docling`"],
        ["output_format", "Parser text style", "`markdown` or `text`"],
        ["options", "Docling options dictionary", "{ profile: 'balanced', do_ocr: true }"]
      ]
    ),
    sampleOutput: [
      {
        title: "Resolved parser metadata in output",
        body: "Navexa writes both the grouped parser config and the resolved Docling options to the saved tree.",
        language: "json",
        code: `{
  "pipeline": {
    "parser_config": {
      "name": "docling",
      "output_format": "markdown",
      "options": {
        "profile": "balanced",
        "do_ocr": true
      }
    },
    "docling_options": {
      "profile": "balanced",
      "do_ocr": true
    }
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: "Teaching parser args on transcript pages",
        fix: "Keep parser control scoped to structured, semi-structured, and unstructured flows."
      },
      {
        mistake: "Starting with env defaults before you understand the per-run settings",
        fix: "Learn `parser_config` first, then move repeated values into env defaults later."
      }
    ],
    advancedOptions: [
      {
        title: "Current merge order for Docling options",
        body: "Resolved parser options come from profile defaults, then environment defaults, then explicit `parser_config.options` for the current call.",
        language: "text",
        code: `Docling option resolution:
1. profile defaults
2. NAVEXA_* parser env defaults
3. parser_config["options"]`
      }
    ],
    tryIt: [
      "Write one minimal `parser_config` object and use it in a structured run.",
      "Inspect the resolved parser metadata in `tree_navexa.json`.",
      "Only then move repeated values into env defaults if you still need that."
    ],
    nextSteps: [
      next("parser_config (recommended)", "/docs/parser-config"),
      next("Environment variables", "/docs/parser-env")
    ]
  }),
  createArticle({
    id: "parser-config",
    category: "Core concepts",
    navParentId: "parser-setup",
    title: "parser_config (recommended)",
    description:
      "Use grouped `parser_config` in new Python and CLI examples. Pick a Docling profile first, then override only the options you actually need.",
    whatThisPageIsFor: [
      "Show the current parser API shape for code and CLI.",
      "Explain what `balanced`, `image_manual`, and `fast_text` actually mean.",
      "Keep grouped parser config above old flat parser flags.",
      "Document transcript exceptions without teaching parser control through transcript."
    ],
    whenToUse: [
      "You want explicit parser behavior in code",
      "You want a JSON config file for CLI runs",
      "You are writing docs, notebooks, or team examples that should stay current"
    ],
    prerequisites: [
      "A structured, semi-structured, or unstructured wrapper",
      "A reason to control output format or Docling options"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Use parser_config directly in Python",
        body: "This is the current recommended form for wrapper calls.",
        language: "python",
        code: `${parserConfigCode}

result = index_unstructured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    parser_config=parser_config,
)`
      },
      {
        title: "Choose a profile as your starting point",
        body: "A profile is a preset bundle of Docling defaults. `balanced` is the safe default for most PDFs, `image_manual` keeps picture description on, and `fast_text` turns OCR off and switches the backend to `onnxruntime` for faster digital-text parsing.",
        language: "python",
        code: `parser_config = {
    "name": "docling",
    "output_format": "markdown",
    "options": {"profile": "fast_text"},
}`
      },
      {
        title: "Use --parser-config in CLI",
        body: "The CLI matches the grouped API. You can pass inline JSON or a path to a JSON file.",
        language: "bash",
        code: `navexa-index
  --pdf /absolute/path/document.pdf
  --out-dir /absolute/path/out
  --document-type structured
  --mode no-llm
  --parser-config /absolute/path/parser-config.json`
      },
      {
        title: "Remember the structured and semi-structured markdown rule",
        body: "If you request `output_format=\"text\"` for structured or semi-structured, current code warns and forces it back to markdown."
      }
    ],
    variablesTable: table(
      ["Field", "Meaning", "Notes"],
      [
        ["name", "Parser backend", "Currently `docling`"],
        ["output_format", "Parser text style", "`markdown` or `text`"],
        ["options.profile", "Starting Docling preset", "`balanced`, `image_manual`, `fast_text`"],
        ["options", "Docling option dictionary", "profile and parser toggles live here"]
      ]
    ),
    sampleOutput: [
      {
        title: "parser-config.json file",
        body: "This is a clean CLI-friendly file format that mirrors the Python dictionary shape.",
        language: "json",
        code: cliParserConfigJson
      },
      {
        title: "Resolved values when profile=`fast_text`",
        body: "This is the actual resolved Docling state used by current Navexa code before any env or per-option overrides change it.",
        language: "json",
        code: `{
  "pipeline": {
    "parser_config": {
      "name": "docling",
      "output_format": "markdown",
      "options": {
        "profile": "fast_text",
        "do_ocr": false,
        "force_full_page_ocr": false,
        "backend": "onnxruntime",
        "do_table_structure": true,
        "do_picture_description": false,
        "enable_remote_services": false,
        "image_mode": "placeholder",
        "quiet": true
      }
    }
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: "Trying to combine parser_config with old flat parser args in the same example",
        fix: "Teach one path. Use `parser_config` first and move old flat args to a migration-only page."
      },
      {
        mistake: "Passing parser config to transcript CLI runs and expecting it to matter",
        fix: "Current transcript CLI warns that parser configuration is ignored."
      }
    ],
    advancedOptions: [
      {
        title: "CLI accepts inline JSON or file paths",
        body: "Use file paths once the config becomes long enough that inline shell JSON hurts readability."
      },
      {
        title: "What each `options` property means",
        body: "Use this when you want the plain-English meaning of each Docling option before overriding a profile.",
        definitionGroups: [
          {
            lead: "Supported",
            badge: "options",
            trail: "properties:",
            items: [
              {
                label: "profile",
                description:
                  "Chooses the starting Docling preset. Start here first, then override only the fields you need."
              },
              {
                label: "do_ocr",
                description:
                  "Turns OCR on or off. Keep it on for scanned or image-based PDFs. Turn it off for clean digital-text PDFs."
              },
              {
                label: "force_full_page_ocr",
                description:
                  "Forces OCR across the full page instead of relying only on existing extracted text. Useful for hard scans."
              },
              {
                label: "do_table_structure",
                description:
                  "Preserves table structure instead of flattening tables into plain text. Keep this on for table-heavy documents."
              },
              {
                label: "do_picture_description",
                description:
                  "Lets Docling generate picture descriptions. Useful for manuals, diagrams, and image-heavy documents."
              },
              {
                label: "enable_remote_services",
                description:
                  "Allows remote enrichment services when the parser supports them. Leave this off unless you explicitly need that behavior."
              },
              {
                label: "backend",
                description:
                  "Chooses the OCR runtime. `torch` is the default. `onnxruntime` is the lighter/faster path used by `fast_text`."
              },
              {
                label: "image_mode",
                description:
                  "Controls how images are represented in markdown output. The default is `placeholder`."
              },
              {
                label: "quiet",
                description:
                  "Reduces Docling and OCR log noise during normal runs. Keep this on unless you are actively debugging parser behavior."
              }
            ]
          }
        ],
        moreDetails: [
          {
            title: "More about `image_mode` values",
            definitionGroups: [
              {
                items: [
                  {
                    label: "placeholder",
                    description: "Keeps lightweight placeholder markers for images in markdown output."
                  },
                  {
                    label: "embedded",
                    description: "Embeds image data directly into the markdown output."
                  },
                  {
                    label: "referenced",
                    description: "Keeps image references instead of embedding image payloads into the markdown."
                  },
                  {
                    label: "none",
                    description:
                      "Requests no image rendering mode. Current Navexa code still normalizes unsupported values safely."
                  }
                ]
              }
            ]
          },
          {
            title: "More about option resolution order",
            body: "Navexa resolves Docling options in this order: profile defaults, then `NAVEXA_*` parser environment values, then explicit `parser_config.options` values for the current call."
          }
        ]
      },
      {
        title: "Built-in Docling profiles",
        body: "Treat profiles as starting presets, not fixed modes. These are the resolved defaults before env overrides or explicit option overrides. All three profiles keep `image_mode=placeholder` by default.",
        table: table(
          [
            "Setting",
            profileHeader("balanced", "default", "balanced"),
            profileHeader("image_manual", "images", "image"),
            profileHeader("fast_text", "speed", "fast")
          ],
          [
            [
              "Best for",
              "Most documents",
              "Image-heavy manuals and decks",
              "Clean digital-text PDFs when you want faster parsing"
            ],
            [
              "OCR",
              boolCell(true),
              boolCell(true),
              boolCell(false)
            ],
            [
              "Full-page OCR",
              boolCell(true),
              boolCell(true),
              boolCell(false)
            ],
            [
              "Table extraction",
              boolCell(true),
              boolCell(true),
              boolCell(true)
            ],
            [
              "Picture description",
              boolCell(false),
              boolCell(true),
              boolCell(false)
            ],
            [
              "Backend",
              codeCell("torch"),
              codeCell("torch"),
              codeCell("onnxruntime")
            ],
            [
              "Image mode",
              codeCell("placeholder"),
              codeCell("placeholder"),
              codeCell("placeholder")
            ],
            [
              "Remote services",
              boolCell(false),
              boolCell(false),
              boolCell(false)
            ],
            [
              "Quiet",
              boolCell(true),
              boolCell(true),
              boolCell(true)
            ]
          ],
          { variant: "comparison" }
        )
      },
      {
        title: "Profile first, override second",
        body: "For example, if you choose `fast_text` but still want OCR, keep the profile and override only that one field.",
        language: "python",
        code: `parser_config = {
    "name": "docling",
    "output_format": "markdown",
    "options": {
        "profile": "fast_text",
        "do_ocr": True,
    },
}`
      }
    ],
    deprecatedNotes: [
      {
        title: "Legacy parser aliases still exist",
        body: "Current code still tolerates old parser concepts for compatibility, including `docling_options` aliases inside some parser configs, but new examples should stay grouped and simple."
      }
    ],
    tryIt: [
      "Run the same PDF once with `balanced` and once with `fast_text`.",
      "Inspect `pipeline.parser_config.options` in the saved tree.",
      "Then override one option manually so you can see the profile-plus-override pattern."
    ],
    nextSteps: [
      next("Environment variables", "/docs/parser-env"),
      next("Legacy parser args (deprecated)", "/docs/parser-legacy")
    ]
  }),
  createArticle({
    id: "parser-env",
    category: "Core concepts",
    navParentId: "parser-setup",
    title: "Environment variables",
    description:
      "Use parser environment variables only when you want shared defaults across runs. Keep function-level parser_config as the main teaching path and use env defaults as a second layer.",
    whatThisPageIsFor: [
      "Show the current parser env defaults clearly and without mixing them into every example.",
      "Explain how parser env defaults interact with parser_config.",
      "Document the env loading path used by Navexa."
    ],
    whenToUse: [
      "You want the same parser defaults in many terminal runs",
      "You share a notebook or shell environment with one parser baseline",
      "You want parser_config to stay short because only a few values differ per run"
    ],
    prerequisites: [
      "A reason to share parser defaults across runs",
      "A `.env` or shell environment you control",
      "A non-transcript wrapper"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Set parser defaults in env",
        body: "These values act as defaults. Explicit parser_config still wins for the current call.",
        language: "bash",
        code: `export NAVEXA_PARSER_MODEL=docling
export NAVEXA_DOCLING_OUTPUT_FORMAT=markdown
export NAVEXA_DOCLING_PROFILE=balanced
export NAVEXA_DOCLING_OCR=1
export NAVEXA_DOCLING_TABLE_STRUCTURE=1
export NAVEXA_DOCLING_IMAGE_MODE=placeholder
export NAVEXA_DOCLING_QUIET=1`
      },
      {
        title: "Let Navexa load env files automatically",
        body: "Current env loading order is explicit `NAVEXA_ENV_FILE`, then a cwd `.env`, then the repo-local `.env` for backward compatibility.",
        language: "python",
        code: `from navexa import load_navexa_env

load_navexa_env()`
      },
      {
        title: "Override only what changes per run",
        body: "Keep the env defaults stable, then override a few parser values directly in parser_config when needed.",
        language: "python",
        code: `result = index_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    parser_config={
        "name": "docling",
        "output_format": "markdown",
        "options": {"profile": "fast_text"},
    },
)`
      }
    ],
    variablesTable: table(
      ["Env var", "Meaning", "Default"],
      [
        ["NAVEXA_PARSER_MODEL", "Parser backend", "`docling`"],
        ["NAVEXA_DOCLING_OUTPUT_FORMAT", "Parser text style", "`markdown`"],
        ["NAVEXA_DOCLING_PROFILE", "Docling profile", "`balanced`"],
        ["NAVEXA_DOCLING_OCR", "OCR toggle", "`1`"],
        ["NAVEXA_DOCLING_FORCE_FULL_PAGE_OCR", "Full page OCR", "`1`"],
        ["NAVEXA_RAPIDOCR_BACKEND", "OCR backend", "`torch`"],
        ["NAVEXA_DOCLING_TABLE_STRUCTURE", "Table extraction", "`1`"],
        ["NAVEXA_DOCLING_PICTURE_DESCRIPTION", "Picture description", "`0`"],
        ["NAVEXA_DOCLING_REMOTE_SERVICES", "Remote services", "`0`"],
        ["NAVEXA_DOCLING_IMAGE_MODE", "Image rendering mode", "`placeholder`"],
        ["NAVEXA_DOCLING_QUIET", "Reduce parser noise", "`1`"]
      ]
    ),
    sampleOutput: [
      {
        title: "Resolved parser output after env + parser_config",
        body: "The tree shows the final resolved state, not just the env values you set.",
        language: "json",
        code: `{
  "parser_config": {
    "name": "docling",
    "output_format": "markdown",
    "options": {
      "profile": "fast_text",
      "do_ocr": false,
      "quiet": true
    }
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: "Assuming env defaults override explicit parser_config",
        fix: "Current code treats env as defaults. Explicit parser_config options still win for the current run."
      },
      {
        mistake: "Hiding every parser decision in env variables",
        fix: "Use env for shared defaults, not as a replacement for readable examples."
      }
    ],
    advancedOptions: [
      {
        title: "Use NAVEXA_ENV_FILE when one project needs a dedicated env file",
        body: "This keeps parser defaults and model defaults in one explicit place."
      }
    ],
    tryIt: [
      "Set one parser env baseline.",
      "Override only one value in parser_config for the next run.",
      "Inspect the resolved parser output in the saved tree."
    ],
    nextSteps: [
      next("Legacy parser args (deprecated)", "/docs/parser-legacy"),
      next("Save and Load Trees", "/docs/save-fetch")
    ]
  }),
  createArticle({
    id: "parser-legacy",
    category: "Core concepts",
    navParentId: "parser-setup",
    title: "Legacy parser args (deprecated)",
    description:
      "These arguments still exist so older code and scripts can keep running, but they should not lead new examples. Use this page only when you are migrating older Navexa calls.",
    whatThisPageIsFor: [
      "Map older flat parser arguments to the grouped parser_config path.",
      "Show the remaining compatibility behavior without making it the main teaching path.",
      "Give migration guidance for older CLI scripts."
    ],
    whenToUse: [
      "You are updating an older notebook or script",
      "You need to understand why current code still accepts flat parser fields",
      "You are migrating a shell script that still uses older CLI flags"
    ],
    prerequisites: [
      "A reason to keep older parser calls working while you migrate them",
      "An understanding of the grouped parser_config path first"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Map old Python args to parser_config",
        body: "Read the left side as compatibility-only and the right side as the preferred grouped path.",
        table: table(
          ["Old field", "Preferred replacement"],
          [
            ["parser_model", "parser_config.name"],
            ["output_format", "parser_config.output_format"],
            ["docling_options", "parser_config.options"]
          ]
        )
      },
      {
        title: "Map old CLI flags to --parser-config",
        body: "The current CLI still accepts flat parser flags, but they are now compatibility shorthands rather than the preferred teaching path.",
        table: table(
          ["Legacy CLI flag", "Preferred grouped path"],
          [
            ["--parser-model", "--parser-config JSON"],
            ["--output-format", "--parser-config JSON"],
            ["--docling-profile", "--parser-config JSON"],
            ["--docling-ocr", "--parser-config JSON"],
            ["--docling-table-structure", "--parser-config JSON"]
          ]
        )
      },
      {
        title: "Know what happens when new and old parser args mix",
        body: "If `--parser-config` is present, current CLI warns that old parser flags are ignored. When `parser_config` is provided in Python, legacy parser args are deprecated and ignored."
      }
    ],
    sampleOutput: [
      {
        title: "Compatibility warning examples",
        body: "These warnings are expected when migration code still mixes old and new parser paths.",
        language: "text",
        code: `DeprecationWarning: parser_model, output_format, and docling_options are deprecated.
UserWarning: --parser-config was provided, so legacy parser flags are ignored.`
      }
    ],
    commonMistakes: [
      {
        mistake: "Continuing to teach flat parser args in new examples",
        fix: "Keep them on migration pages only. Teach parser_config first everywhere else."
      },
      {
        mistake: "Expecting old parser flags to change transcript runs",
        fix: "Current transcript CLI warns that parser configuration is ignored."
      }
    ],
    advancedOptions: [
      {
        title: "Migrate page by page, not all at once",
        body: "It is fine to keep compatibility code temporarily while you convert examples to grouped parser_config."
      }
    ],
    tryIt: [
      "Pick one old notebook cell or script.",
      "Replace flat parser args with parser_config.",
      "Remove the compatibility path once the new version works."
    ],
    nextSteps: [
      next("Save and Load Trees", "/docs/save-fetch"),
      next("Compatibility and Deprecated", "/docs/compatibility-deprecated")
    ]
  }),
  createArticle({
    id: "save-fetch",
    category: "Core concepts",
    title: "Save and Load Trees",
    description:
      "Save the canonical tree first, add validation when needed, keep compat output only for legacy consumers, and use the fetch helpers to reload trees from dicts, files, or output folders.",
    whatThisPageIsFor: [
      "Show the current save and fetch workflow for canonical Navexa outputs.",
      "Keep `tree_navexa.json` clearly above compatibility-only artifacts.",
      "Explain which helper returns which object."
    ],
    whenToUse: [
      "You want to persist indexing output",
      "You want to pass saved trees into reasoning later",
      "You need to reload a tree from a directory, file path, or result object"
    ],
    prerequisites: [
      "An `IndexResult` from one of the indexing wrappers",
      "An output directory path if you want explicit save locations"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Save the canonical tree first",
        body: "This should be the default artifact for nearly every workflow.",
        language: "python",
        code: `from navexa import save_document_tree

saved = save_document_tree(
    index_result,
    out_dir="/absolute/path/out",
    write_tree=True,
    write_validation=False,
    write_compat=False,
)`
      },
      {
        title: "Add validation when you want quality signals",
        body: "Validation is optional but helpful when you are comparing parser settings or document families.",
        language: "python",
        code: `saved = save_document_tree(
    index_result,
    out_dir="/absolute/path/out",
    write_tree=True,
    write_validation=True,
)`
      },
      {
        title: "Fetch tree, validation, and compat artifacts later",
        body: "The fetch helpers accept a dict, a file path, a directory path, or result objects where appropriate.",
        language: "python",
        code: `from navexa import fetch_document_tree, fetch_validation_report, fetch_compat_tree

tree = fetch_document_tree("/absolute/path/out")
validation = fetch_validation_report("/absolute/path/out")
compat = fetch_compat_tree("/absolute/path/out")`
      },
      {
        title: "Use the one-call index-and-save helper when it truly helps readability",
        body: "This keeps indexing and saving together when you already know both belong in the same example.",
        language: "python",
        code: `from navexa import index_and_save_document_tree

index_result, save_result = index_and_save_document_tree(
    pdf_path="/absolute/path/document.pdf",
    out_dir="/absolute/path/out",
    mode="no-llm",
    write_tree=True,
    write_validation=True,
)`
      }
    ],
    variablesTable: table(
      ["Flag or helper", "Meaning", "Default or behavior"],
      [
        ["write_tree", "Write `tree_navexa.json`", "True"],
        ["write_validation", "Write `validation_report.json`", "False"],
        ["write_compat", "Write `tree_legacy_compat.json`", "False"],
        ["fetch_document_tree", "Load canonical tree", "dict, file, dir, or IndexResult"],
        ["fetch_validation_report", "Load validation report if present", "dict, file, dir, or IndexResult"],
        ["fetch_compat_tree", "Load legacy compat tree if present", "dict, file, dir, or IndexResult"]
      ]
    ),
    sampleOutput: [
      {
        title: "SaveResult",
        body: "The save helper returns where artifacts were written.",
        language: "json",
        code: `{
  "out_dir": "/absolute/path/out",
  "paths": {
    "tree_navexa": "/absolute/path/out/tree_navexa.json",
    "validation_report": "/absolute/path/out/validation_report.json"
  }
}`
      },
      {
        title: "Canonical file list",
        body: "Teach these in this order: tree first, validation second, compat last.",
        language: "text",
        code: `tree_navexa.json
validation_report.json
tree_legacy_compat.json  # only when explicitly enabled`
      }
    ],
    commonMistakes: [
      {
        mistake: "Treating the compat tree as the default output",
        fix: "Use `tree_navexa.json` as the canonical output and enable compat only for legacy consumers."
      },
      {
        mistake: "Calling save_document_tree with every write flag disabled",
        fix: "Current code raises because at least one artifact must be enabled."
      }
    ],
    advancedOptions: [
      {
        title: "Default output directory behavior",
        body: "If you do not pass `out_dir`, current code derives a directory from the source PDF path or doc id."
      }
    ],
    deprecatedNotes: [
      {
        title: "Compat output is migration-only",
        body: "Keep `write_compat` and `tree_legacy_compat.json` out of new tutorials unless you are explicitly helping users migrate older consumers."
      }
    ],
    tryIt: [
      "Save a run with tree + validation.",
      "Reload both artifacts with the fetch helpers.",
      "Only enable compat on a second run if you truly need it."
    ],
    nextSteps: [
      next("Reasoning Retrieval Workflow", "/docs/reasoning"),
      next("Output Schema (Canonical)", "/docs/output-schema")
    ]
  }),
  createArticle({
    id: "reasoning",
    category: "Core concepts",
    title: "Reasoning Retrieval Workflow",
    description:
      "Navexa reasoning is tree-first, traceable, and vectorless. Build a search view, select nodes with an LLM, extract context from those nodes, and answer only from that context.",
    whatThisPageIsFor: [
      "Explain the end-to-end reasoning workflow without forcing users into the densest child pages first.",
      "Keep current reasoning APIs above compatibility guidance.",
      "Show the relationship between the tree, reasoning result, context bundle, answer result, and full RAG result."
    ],
    whenToUse: [
      "You already have a Navexa tree and want grounded question answering",
      "You want traceable node selection before generating an answer",
      "You want a lighter alternative to vector-based RAG pipelines"
    ],
    prerequisites: [
      "A saved or in-memory `tree_navexa` document",
      "LLM configuration for reasoning",
      "A clear question you want answered against that tree"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Load the canonical tree",
        body: "The fetch helper is a simple way to normalize a saved tree before reasoning.",
        language: "python",
        code: `from navexa import fetch_document_tree

tree = fetch_document_tree("/absolute/path/out")`
      },
      {
        title: "Run the full one-call reasoning flow",
        body: "This is the fastest current-first path. Use the child pages later when you want deeper control.",
        language: "python",
        code: `from navexa import run_reasoning_rag

rag = run_reasoning_rag(
    query="What parser settings does this run use?",
    tree_or_source=tree,
    model_config={
        "provider": "openai",
        "model": "gpt-4.1-mini",
        "api_key": "...",
    },
)

print(rag.answer.answer)`
      },
      {
        title: "Inspect the result object instead of guessing",
        body: "The one-call helper returns the tree, tree view, node index, reasoning result, context bundle, answer, and usage deltas together.",
        language: "python",
        code: `print(rag.reasoning.node_list)
print(rag.context.node_records)
print(rag.cost_delta)`
      }
    ],
    variablesTable: table(
      ["Field", "Meaning", "Typical values"],
      [
        ["tree_or_source", "Tree dict, file path, directory path, or saved result source", "dict or output directory"],
        ["model_config", "LLM configuration for reasoning", "{ provider, model, api_key, base_url, pricing_model }"],
        ["text_mode", "Whether extracted context uses inclusive or exclusive text", "`inclusive` or `exclusive`"],
        ["dedupe_ancestor", "Drop redundant child/parent overlaps in selection", "True by default"],
        ["return_prompt", "Return rendered prompt text in result objects", "False by default"]
      ]
    ),
    sampleOutput: [
      {
        title: "RAGResult shape",
        body: "The one-call helper keeps every stage result together so you can debug or inspect without re-running the full pipeline.",
        language: "json",
        code: ragResultSample
      }
    ],
    commonMistakes: [
      {
        mistake: "Trying reasoning before the tree itself is trustworthy",
        fix: "Validate the indexing output first. Reasoning quality cannot rescue a broken tree."
      },
      {
        mistake: "Treating reasoning as a black box",
        fix: "Inspect `rag.reasoning`, `rag.context`, and `rag.cost_delta` after each run."
      }
    ],
    advancedOptions: [
      {
        title: "Use step-by-step functions when you want full control",
        body: "The child pages show how to split tree search, context extraction, and answer generation into separate calls."
      },
      {
        title: "Use prompt customization and external adapters only after the default flow is stable",
        body: "Custom prompts and `BaseExternalLLM` are powerful, but they should not be the first explanation users read."
      }
    ],
    tryIt: [
      "Load one saved tree and ask a simple grounded question.",
      "Inspect the selected node ids and context records.",
      "Only then move into prompt or adapter customization."
    ],
    nextSteps: [
      next("Build tree view and node index", "/docs/reasoning-tree-view-index"),
      next("One-call helper", "/docs/reasoning-end-to-end")
    ]
  }),
  createArticle({
    id: "reasoning-tree-view-index",
    category: "Core concepts",
    navParentId: "reasoning",
    title: "Build tree view and node index",
    description:
      "These two helpers prepare the tree for reasoning: one creates a lighter prompt-safe search view, and the other builds a convenient node lookup map.",
    whatThisPageIsFor: [
      "Show the exact role of `build_search_tree_view` and `build_node_index`.",
      "Make the prompt input and inspection input easy to understand.",
      "Keep tree preparation separate from node selection and answer generation."
    ],
    whenToUse: [
      "You want to inspect the reasoning input",
      "You want a separate node lookup for debugging or UI work",
      "You are using the step-by-step reasoning path instead of the one-call helper"
    ],
    prerequisites: [
      "A normalized Navexa tree document",
      "A question you want to answer later"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Build the search tree view",
        body: "This strips heavy text fields by default so the LLM sees structure, summaries, titles, and node ids rather than the full raw text body.",
        language: "python",
        code: `from navexa import build_search_tree_view

tree_view = build_search_tree_view(tree)
print("search_tree_ready")`
      },
      {
        title: "Build the node index",
        body: "This gives you a node_id keyed map with page ranges, titles, summaries, and text fields for later context extraction or trace printing.",
        language: "python",
        code: `from navexa import build_node_index

node_index = build_node_index(tree, include_page_ranges=True)
print(node_index["0001.0001"]["title"])`
      }
    ],
    variablesTable: table(
      ["Function field", "Meaning", "Default"],
      [
        ["strip_fields", "Fields removed from tree view", "`exclusive_text`, `full_text`"],
        ["include_page_ranges", "Whether page_index is derived for node index rows", "True"],
        ["exclude_fields", "Fields removed from node index rows", "None"]
      ]
    ),
    sampleOutput: [
      {
        title: "Search tree view example",
        body: "Use this to understand what the reasoning model actually sees.",
        language: "json",
        code: searchTreeViewSample
      },
      {
        title: "Node index example",
        body: "Use this to debug retrieved node ids or build your own downstream tooling.",
        language: "json",
        code: nodeIndexSample
      }
    ],
    commonMistakes: [
      {
        mistake: "Passing a directory path straight into `build_search_tree_view`",
        fix: "Load the tree first. These helpers expect a tree object, not a saved-path source."
      },
      {
        mistake: "Confusing tree view and node index",
        fix: "The tree view is prompt input. The node index is a lookup table for later inspection and context extraction."
      }
    ],
    advancedOptions: [
      {
        title: "Exclude extra fields from the node index when you need a lighter payload",
        body: "Use `exclude_fields` if you are moving the index into another system and do not want every field."
      }
    ],
    tryIt: [
      "Build both structures from one saved tree.",
      "Compare what each helper returns.",
      "Use them in the next reasoning step."
    ],
    nextSteps: [
      next("Select nodes with LLM", "/docs/reasoning-select-nodes"),
      next("Extract context and generate answer", "/docs/reasoning-context-answer")
    ]
  }),
  createArticle({
    id: "reasoning-select-nodes",
    category: "Core concepts",
    navParentId: "reasoning",
    title: "Select nodes with LLM",
    description:
      "Use `reason_over_tree` to pick the node ids most likely to answer a question, and `print_reasoning_trace` to inspect what the model selected.",
    whatThisPageIsFor: [
      "Explain the selection stage clearly and separately from answer generation.",
      "Show the current accepted types for prompt customization and external adapters.",
      "Keep the result object shape explicit."
    ],
    whenToUse: [
      "You want to select relevant nodes before extracting context",
      "You want to inspect the reasoning output directly",
      "You are using the step-by-step reasoning path"
    ],
    prerequisites: [
      "A normalized tree object",
      "LLM configuration or a `BaseExternalLLM` adapter",
      "Optionally a node index for pretty trace printing"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Run reason_over_tree",
        body: "This stage uses the search tree view and asks the model to return only node ids plus brief reasoning.",
        language: "python",
        code: `from navexa import reason_over_tree

reasoning = reason_over_tree(
    query="Which parser settings were used?",
    tree=tree,
    model_config={
        "provider": "openai",
        "model": "gpt-4.1-mini",
        "api_key": "...",
    },
)

print(reasoning.node_list)`
      },
      {
        title: "Print a readable trace",
        body: "This is useful when you want page ranges and titles next to the selected node ids.",
        language: "python",
        code: `from navexa import build_node_index, print_reasoning_trace

node_index = build_node_index(tree)
print_reasoning_trace(reasoning, node_index)`
      }
    ],
    variablesTable: table(
      ["Field", "Meaning", "Typical values"],
      [
        ["query", "User question", "plain language question"],
        ["model_config", "Current preferred LLM config path", "{ provider, model, api_key, base_url, pricing_model }"],
        ["prompt_template", "String or callable prompt override", "optional"],
        ["llm_callable", "External adapter instance", "`BaseExternalLLM` subclass instance"],
        ["prompt_extra", "Extra JSON payload for prompt policy", "dict or null"],
        ["return_prompt", "Return rendered prompt in result", "False by default"]
      ]
    ),
    sampleOutput: [
      {
        title: "TreeReasoningResult",
        body: "This is the object returned by `reason_over_tree`.",
        language: "json",
        code: reasoningResultSample
      },
      {
        title: "Trace output",
        body: "The printed trace is a debugging aid, not the canonical returned object.",
        language: "text",
        code: `Reasoning Process:
The answer is likely in the parser configuration section.

Retrieved Nodes:
Node ID: 0001.0002   Page: 4-5   Title: parser_config`
      }
    ],
    commonMistakes: [
      {
        mistake: "Passing a plain function as `llm_callable`",
        fix: "Current runtime supports adapter instances only. Use a `BaseExternalLLM` subclass instance."
      },
      {
        mistake: "Expecting reason_over_tree to return extracted text",
        fix: "It returns selected node ids and reasoning. Context extraction is the next step."
      }
    ],
    advancedOptions: [
      {
        title: "Use prompt_extra for structured policy hints",
        body: "If your template contains `{extra_json}`, Navexa fills it. If it does not, Navexa appends a dedicated JSON section automatically."
      }
    ],
    tryIt: [
      "Run one reasoning query and inspect the node ids.",
      "Print the reasoning trace against a node index.",
      "Move on to context extraction next."
    ],
    nextSteps: [
      next("Extract context and generate answer", "/docs/reasoning-context-answer"),
      next("One-call helper", "/docs/reasoning-end-to-end")
    ]
  }),
  createArticle({
    id: "reasoning-context-answer",
    category: "Core concepts",
    navParentId: "reasoning",
    title: "Extract context and generate answer",
    description:
      "Once you have node ids, extract grounded text from those nodes and send only that text into answer generation.",
    whatThisPageIsFor: [
      "Explain the boundary between node selection and answer generation.",
      "Show the current `ContextBundle` and `AnswerResult` return shapes.",
      "Teach the context controls that matter most for grounded output."
    ],
    whenToUse: [
      "You already have selected node ids",
      "You want to inspect extracted context before generating an answer",
      "You want more control than the one-call helper gives you"
    ],
    prerequisites: [
      "A tree object",
      "A list of selected node ids",
      "LLM configuration or external adapter for the answer stage"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Extract grounded context",
        body: "This step selects text from the chosen nodes and optionally removes redundant child nodes when their parent is already selected.",
        language: "python",
        code: `from navexa import extract_selected_context

context = extract_selected_context(
    tree=tree,
    node_list=reasoning.node_list,
    text_mode="inclusive",
    dedupe_ancestor=True,
)

print(context.node_records)`
      },
      {
        title: "Generate the final answer from context only",
        body: "This stage should answer strictly from the extracted context, not from the whole tree.",
        language: "python",
        code: `from navexa import answer_from_context

answer = answer_from_context(
    query="Which parser settings were used?",
    context_text=context.text,
    model_config={
        "provider": "openai",
        "model": "gpt-4.1-mini",
        "api_key": "...",
    },
)

print(answer.answer)`
      }
    ],
    variablesTable: table(
      ["Field", "Meaning", "Typical values"],
      [
        ["text_mode", "Which text field is used for extraction", "`inclusive` or `exclusive`"],
        ["dedupe_ancestor", "Drop redundant descendants when parent already selected", "True"],
        ["prompt_template", "String or callable answer prompt override", "optional"],
        ["prompt_extra", "Extra JSON payload appended or injected into answer prompt", "dict or null"],
        ["llm_callable", "External adapter instance for answer stage", "`BaseExternalLLM` subclass instance"]
      ]
    ),
    sampleOutput: [
      {
        title: "ContextBundle",
        body: "This is the object returned by `extract_selected_context`.",
        language: "json",
        code: contextBundleSample
      },
      {
        title: "AnswerResult",
        body: "The answer stage returns the final grounded answer plus the raw model output.",
        language: "json",
        code: `{
  "answer": "The run used the balanced Docling profile with markdown output.",
  "raw_response": "The run used the balanced Docling profile with markdown output.",
  "used_prompt": null
}`
      }
    ],
    commonMistakes: [
      {
        mistake: "Skipping context inspection and blaming answer quality first",
        fix: "Look at `context.node_records` and `context.text` before tuning the final prompt."
      },
      {
        mistake: "Using `exclusive` text when you actually need the full inherited node context",
        fix: "Start with `inclusive` unless you have a clear reason to limit the context to exclusive text."
      }
    ],
    advancedOptions: [
      {
        title: "Use step-by-step reasoning when you want different adapters for search and answer",
        body: "The one-call helper uses one adapter argument. The split path lets you call `reason_over_tree` and `answer_from_context` with different adapter instances if you need that."
      }
    ],
    tryIt: [
      "Run extraction once with `inclusive` text mode and once with `exclusive`.",
      "Compare the node records and answer quality.",
      "Keep the text mode that matches your grounding needs."
    ],
    nextSteps: [
      next("One-call helper", "/docs/reasoning-end-to-end"),
      next("Custom prompt define", "/docs/reasoning-custom-prompt")
    ]
  }),
  createArticle({
    id: "reasoning-end-to-end",
    category: "Core concepts",
    navParentId: "reasoning",
    title: "One-call helper: run_reasoning_rag",
    description:
      "Use `run_reasoning_rag` when you want the full search -> context -> answer workflow in one call while still keeping every intermediate result available for inspection.",
    whatThisPageIsFor: [
      "Teach the simplest end-to-end reasoning API.",
      "Show the returned `RAGResult` object clearly.",
      "Keep one-call convenience above customization and migration detail."
    ],
    whenToUse: [
      "You want the shortest working reasoning example",
      "You still want access to every intermediate result object afterward",
      "You do not need separate adapters per stage"
    ],
    prerequisites: [
      "A tree or saved output path",
      "LLM configuration for reasoning"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Run the one-call helper",
        body: "Pass the query, tree source, and model_config. Navexa handles search, selection, context extraction, answer generation, and cost deltas.",
        language: "python",
        code: `from navexa import run_reasoning_rag

rag = run_reasoning_rag(
    query="Which parser settings does this run use?",
    tree_or_source="/absolute/path/out",
    model_config={
        "provider": "openai",
        "model": "gpt-4.1-mini",
        "api_key": "...",
    },
)

print(rag.answer.answer)`
      },
      {
        title: "Inspect the staged outputs",
        body: "The helper still returns everything you need to debug the run later.",
        language: "python",
        code: `print(rag.reasoning.node_list)
print(rag.context.node_records)
print(rag.cost_delta)`
      }
    ],
    variablesTable: table(
      ["Field", "Meaning", "Typical values"],
      [
        ["tree_or_source", "Tree dict or saved source", "dict, file, or output directory"],
        ["tree_prompt_template", "Prompt override for node selection stage", "optional"],
        ["answer_prompt_template", "Prompt override for answer stage", "optional"],
        ["llm_callable", "External adapter instance for both stages", "`BaseExternalLLM` subclass instance"],
        ["text_mode", "Context extraction mode", "`inclusive` or `exclusive`"],
        ["tree_prompt_extra", "Extra JSON for selection prompt", "dict or null"],
        ["answer_prompt_extra", "Extra JSON for answer prompt", "dict or null"]
      ]
    ),
    sampleOutput: [
      {
        title: "RAGResult",
        body: "The one-call helper returns the full set of staged outputs plus cumulative and delta usage.",
        language: "json",
        code: ragResultSample
      }
    ],
    commonMistakes: [
      {
        mistake: "Treating the one-call helper as opaque",
        fix: "Inspect `rag.reasoning`, `rag.context`, and `rag.cost_delta` after each run."
      },
      {
        mistake: "Expecting separate adapter objects for search and answer in the one-call helper",
        fix: "If you need different adapters per stage, use the step-by-step reasoning path."
      }
    ],
    advancedOptions: [
      {
        title: "Enable prompt inspection with return_prompt",
        body: "Use this when you need the rendered prompt text in the returned result objects for debugging."
      }
    ],
    tryIt: [
      "Run one one-call reasoning example.",
      "Inspect the node ids and cost delta.",
      "Only then customize prompts or adapters."
    ],
    nextSteps: [
      next("Custom prompt define", "/docs/reasoning-custom-prompt"),
      next("Custom LLM define", "/docs/reasoning-custom-llm")
    ]
  }),
  createArticle({
    id: "reasoning-custom-prompt",
    category: "Core concepts",
    navParentId: "reasoning",
    title: "Custom prompt define",
    description:
      "Override prompt text only after the default reasoning flow is stable. Current reasoning APIs accept either a string template or a callable prompt builder.",
    whatThisPageIsFor: [
      "Show the current prompt customization path for reasoning APIs.",
      "Explain how `prompt_extra`, `tree_prompt_extra`, and `answer_prompt_extra` are injected.",
      "Keep prompt customization explicit and stage-specific."
    ],
    whenToUse: [
      "The default reasoning prompts are not strict enough for your task",
      "You want a custom format or extra constraints in the prompt",
      "You want to inspect prompt text for debugging"
    ],
    prerequisites: [
      "A working default reasoning run",
      "An understanding of which stage you want to customize"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Pass a string template to reason_over_tree",
        body: "If your template contains `{extra_json}`, Navexa fills it. If not, Navexa appends a JSON section automatically when `prompt_extra` is present.",
        language: "python",
        code: `template = """Question: {query}

Tree:
{tree_json}

Extra:
{extra_json}

Return JSON with thinking and node_list."""

reasoning = reason_over_tree(
    query="Which parser settings were used?",
    tree=tree,
    model_config={
        "provider": "openai",
        "model": "gpt-4.1-mini",
        "api_key": "...",
    },
    prompt_template=template,
    prompt_extra={"must_include_pages": True},
)`
      },
      {
        title: "Pass a callable prompt builder to answer_from_context",
        body: "Use a callable when you want full control over how the prompt string is assembled.",
        language: "python",
        code: `def answer_prompt(query, context_text, extra):
    return f"""Question: {query}

Context:
{context_text}

Answer policy:
{extra}
"""

answer = answer_from_context(
    query="Which parser settings were used?",
    context_text=context.text,
    model_config={
        "provider": "openai",
        "model": "gpt-4.1-mini",
        "api_key": "...",
    },
    prompt_template=answer_prompt,
    prompt_extra={"style": "cite exact field names"},
)`
      },
      {
        title: "Customize the one-call helper stage by stage",
        body: "Use `tree_prompt_template` and `answer_prompt_template` separately when you want different policies for search and final answer.",
        language: "python",
        code: `rag = run_reasoning_rag(
    query="Which parser settings were used?",
    tree_or_source=tree,
    model_config={
        "provider": "openai",
        "model": "gpt-4.1-mini",
        "api_key": "...",
    },
    tree_prompt_template=template,
    answer_prompt_template=answer_prompt,
    tree_prompt_extra={"must_include_pages": True},
    answer_prompt_extra={"style": "cite exact field names"},
)`
      }
    ],
    variablesTable: table(
      ["Field", "Meaning", "Accepted shape"],
      [
        ["prompt_template", "Prompt override for a single-stage API", "string or callable"],
        ["tree_prompt_template", "Selection-stage prompt override", "string or callable"],
        ["answer_prompt_template", "Answer-stage prompt override", "string or callable"],
        ["prompt_extra", "Extra JSON payload for single-stage prompt", "dict or null"],
        ["tree_prompt_extra", "Extra JSON payload for tree-search prompt", "dict or null"],
        ["answer_prompt_extra", "Extra JSON payload for answer prompt", "dict or null"]
      ]
    ),
    sampleOutput: [
      {
        title: "Prompt-extra behavior summary",
        body: "This is the current prompt injection behavior used by the reasoning prompt renderers.",
        language: "text",
        code: `If template contains {extra_json}:
- Navexa replaces it with the JSON payload

If template does not contain {extra_json} and extra exists:
- Navexa appends a dedicated JSON section automatically`
      }
    ],
    commonMistakes: [
      {
        mistake: "Customizing prompts before the default reasoning path works",
        fix: "Only customize prompts after you have a stable baseline and a clear reason for the change."
      },
      {
        mistake: "Using one prompt template shape for every stage without thinking",
        fix: "Search prompts and answer prompts solve different jobs. Customize them separately when necessary."
      }
    ],
    advancedOptions: [
      {
        title: "Return prompts for debugging",
        body: "Set `return_prompt=True` so reasoning or answer result objects include the rendered prompt text."
      }
    ],
    tryIt: [
      "Override one reasoning prompt with a string template.",
      "Add `prompt_extra` and confirm the extra JSON appears as expected.",
      "Only then move to callable prompt builders."
    ],
    nextSteps: [
      next("Custom LLM define", "/docs/reasoning-custom-llm"),
      next("CLI Commands", "/docs/cli")
    ]
  }),
  createArticle({
    id: "reasoning-custom-llm",
    category: "Core concepts",
    navParentId: "reasoning",
    title: "Custom LLM define",
    description:
      "Current external LLM integration is adapter-only. Pass a `BaseExternalLLM` subclass instance as `llm_callable` when you want Navexa reasoning to use your own backend.",
    whatThisPageIsFor: [
      "Document the current external adapter contract exactly.",
      "Remove older function-style llm_callable assumptions.",
      "Show when to use one adapter for both stages and when to split the steps."
    ],
    whenToUse: [
      "You want to route reasoning through your own provider stack",
      "You need a custom client wrapper for internal infrastructure",
      "You want search and answer to use a non-default backend"
    ],
    prerequisites: [
      "A working reasoning baseline with internal providers first",
      "A reason to replace the default LLM client path"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Subclass BaseExternalLLM",
        body: "This is the supported contract. The adapter must implement `invoke(prompt=..., model=..., stage=...)`.",
        language: "python",
        code: `from navexa import BaseExternalLLM

class RouterLLM(BaseExternalLLM):
    def __init__(self):
        super().__init__(provider="custom-router", default_model="router-default")

    def invoke(self, *, prompt, model, stage):
        return {
            "stage": stage,
            "model": model,
            "answer": "Replace this with your real backend call.",
        }`
      },
      {
        title: "Pass the adapter instance to reasoning APIs",
        body: "Current runtime accepts adapter instances, not plain function-style callables.",
        language: "python",
        code: `adapter = RouterLLM()

reasoning = reason_over_tree(
    query="Which parser settings were used?",
    tree=tree,
    model="router-default",
    llm_callable=adapter,
)`
      },
      {
        title: "Use the split path if different stages need different adapters",
        body: "The one-call helper takes one adapter object. Use the split reasoning path if search and answer should route differently.",
        language: "python",
        code: `search_adapter = RouterLLM()
answer_adapter = RouterLLM()

reasoning = reason_over_tree(
    query="Which parser settings were used?",
    tree=tree,
    model="router-default",
    llm_callable=search_adapter,
)

context = extract_selected_context(tree, reasoning.node_list)

answer = answer_from_context(
    query="Which parser settings were used?",
    context_text=context.text,
    model="router-default",
    llm_callable=answer_adapter,
)`
      }
    ],
    variablesTable: table(
      ["Adapter element", "Meaning", "Notes"],
      [
        ["provider", "Adapter identity label", "custom string"],
        ["default_model", "Fallback model if call does not pass one", "optional but practical"],
        ["invoke(prompt, model, stage)", "Required adapter contract", "must be implemented"],
        ["stage", "Reasoning stage name", "`tree_search` or `answer_generation`"]
      ]
    ),
    sampleOutput: [
      {
        title: "Current adapter contract",
        body: "This is the supported adapter-only path.",
        language: "python",
        code: `class BaseExternalLLM:
    def resolve_model(self, model): ...
    def invoke(self, *, prompt, model, stage): ...
    def __call__(self, prompt, model, stage): ...`
      }
    ],
    commonMistakes: [
      {
        mistake: "Passing a plain function as llm_callable",
        fix: "Current runtime requires an instance of a `BaseExternalLLM` subclass."
      },
      {
        mistake: "Forgetting to provide a model for the adapter",
        fix: "Set `default_model` on the adapter or pass `model=...` in the Navexa call."
      }
    ],
    advancedOptions: [
      {
        title: "Inspect prompts with return_prompt before blaming the adapter",
        body: "Debug prompt text first so you know whether a routing problem or a prompt problem caused the behavior."
      }
    ],
    tryIt: [
      "Build one minimal adapter that returns a stub response.",
      "Pass it to `reason_over_tree`.",
      "Only then connect the adapter to a real backend."
    ],
    nextSteps: [
      next("CLI Commands", "/docs/cli"),
      next("Compatibility and Deprecated", "/docs/compatibility-deprecated")
    ]
  }),
  createArticle({
    id: "cli",
    category: "Reference",
    title: "CLI Commands",
    description:
      "The current CLI mirrors the grouped runtime model: `--model-config` and `--parser-config` are the preferred inputs, while old flat flags remain for compatibility only.",
    whatThisPageIsFor: [
      "Show the current CLI path first.",
      "Keep grouped JSON config above the old flat flag path.",
      "Document transcript CLI behavior correctly."
    ],
    whenToUse: [
      "You want repeatable terminal indexing runs",
      "You want config files for parser or model settings",
      "You want to automate indexing outside notebooks"
    ],
    prerequisites: [
      "A working `navexa-index` install",
      "A PDF path and output directory",
      "Model config only when you need LLM"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Run a structured no-LLM smoke command",
        body: "This is still the best first CLI run.",
        language: "bash",
        code: `navexa-index
  --pdf /absolute/path/document.pdf
  --out-dir /absolute/path/out
  --document-type structured
  --mode no-llm
  --with-validation`
      },
      {
        title: "Run with grouped JSON config files",
        body: "This is the current preferred path when CLI configuration grows beyond a tiny example.",
        language: "bash",
        code: `navexa-index
  --pdf /absolute/path/document.pdf
  --out-dir /absolute/path/out
  --document-type structured
  --mode llm
  --model-config /absolute/path/model-config.json
  --parser-config /absolute/path/parser-config.json
  --with-validation`
      },
      {
        title: "Run transcript correctly",
        body: "Transcript stays LLM-required and ignores parser config inputs.",
        language: "bash",
        code: `navexa-index
  --pdf /absolute/path/transcript.pdf
  --out-dir /absolute/path/out
  --document-type transcript
  --mode llm
  --model-config /absolute/path/model-config.json`
      }
    ],
    variablesTable: table(
      ["Flag", "Meaning", "Notes"],
      [
        ["--pdf", "Input PDF path", "required"],
        ["--out-dir", "Output directory", "required"],
        ["--document-type", "structured | semi_structured | unstructured | transcript", "defaults to structured"],
        ["--mode", "llm | no-llm", "defaults from env or no-llm"],
        ["--model-config", "Inline JSON or path to JSON file", "preferred"],
        ["--parser-config", "Inline JSON or path to JSON file", "preferred for non-transcript flows"],
        ["--with-validation", "Write validation_report.json", "optional"],
        ["--with-compat", "Write tree_legacy_compat.json", "compatibility-only output"]
      ]
    ),
    sampleOutput: [
      {
        title: "parser-config.json example",
        body: "Use file-based JSON once parser setup is more than a couple of fields.",
        language: "json",
        code: cliParserConfigJson
      },
      {
        title: "CLI output shape",
        body: "With one artifact, the CLI prints a single path. With extra outputs enabled, it prints a JSON object of paths.",
        language: "text",
        code: `/absolute/path/out/tree_navexa.json`
      }
    ],
    commonMistakes: [
      {
        mistake: "Using `--parser-config` in transcript runs and expecting it to apply",
        fix: "Current CLI warns that parser configuration is ignored for transcript."
      },
      {
        mistake: "Teaching `--model` before `--model-config`",
        fix: "Keep `--model` in migration notes only. Use `--model-config` in current examples."
      }
    ],
    advancedOptions: [
      {
        title: "Inline JSON still works",
        body: "Use inline JSON only when the config is short enough to stay readable in the shell."
      }
    ],
    deprecatedNotes: [
      {
        title: "Legacy parser flags are still accepted",
        body: "Flags like `--parser-model` and `--docling-profile` are compatibility shorthands. Do not lead new examples with them."
      },
      {
        title: "Legacy --model is deprecated",
        body: "Current CLI still accepts it, but `--model-config` is the preferred public path."
      }
    ],
    tryIt: [
      "Run one structured no-LLM CLI command.",
      "Move parser settings into `parser-config.json`.",
      "Keep transcript CLI separate from parser CLI examples."
    ],
    nextSteps: [
      next("Python API Reference (Top-level)", "/docs/api-reference"),
      next("Troubleshooting", "/docs/troubleshooting")
    ]
  }),
  createArticle({
    id: "api-reference",
    category: "Reference",
    title: "Python API Reference (Top-level)",
    description:
      "This page summarizes the current top-level exports you should teach and use from `navexa`. It keeps public wrappers above compatibility helpers and internal implementation details.",
    whatThisPageIsFor: [
      "List the current public API surface in one place.",
      "Group the exports by indexing, saving/loading, reasoning, and utility functions.",
      "Keep public wrappers above old compatibility-first calls."
    ],
    whenToUse: [
      "You want a compact reference after reading the tutorial pages",
      "You are checking which names are exported from `navexa` directly",
      "You are validating a code sample against the public API"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Indexing and saving wrappers",
        body: "These are the current wrapper functions to teach first.",
        table: table(
          ["Export", "Use"],
          [
            ["index_structured_document_tree", "Structured document indexing"],
            ["index_semi_structured_document_tree", "Semi-structured document indexing"],
            ["index_unstructured_document_tree", "Unstructured document indexing"],
            ["index_transcript_document_tree", "Transcript indexing"],
            ["save_document_tree", "Write tree and optional reports"],
            ["index_and_save_document_tree", "Index + save in one call"]
          ]
        )
      },
      {
        title: "Save/load helpers",
        body: "Use these when your workflow moves between memory and saved artifacts.",
        table: table(
          ["Export", "Use"],
          [
            ["fetch_document_tree", "Load canonical tree from dict/path/dir/result"],
            ["fetch_validation_report", "Load validation report if present"],
            ["fetch_compat_tree", "Load legacy compat tree if present"]
          ]
        )
      },
      {
        title: "Reasoning exports",
        body: "These functions cover tree preparation, selection, context extraction, answer generation, and the one-call helper.",
        table: table(
          ["Export", "Use"],
          [
            ["build_search_tree_view", "Prompt-safe reasoning tree view"],
            ["build_node_index", "Node lookup map"],
            ["reason_over_tree", "LLM node selection"],
            ["print_reasoning_trace", "Readable trace output"],
            ["extract_selected_context", "Grounded context bundle"],
            ["answer_from_context", "Context-grounded answer generation"],
            ["run_reasoning_rag", "One-call reasoning workflow"]
          ]
        )
      },
      {
        title: "Result objects and utilities",
        body: "These are the main returned object types and helper exports worth knowing.",
        table: table(
          ["Export", "Meaning"],
          [
            ["IndexResult", "Indexing return object"],
            ["SaveResult", "Save helper return object"],
            ["TreeReasoningResult", "Node-selection stage result"],
            ["ContextBundle", "Extracted context return object"],
            ["AnswerResult", "Final answer return object"],
            ["RAGResult", "One-call reasoning return object"],
            ["BaseExternalLLM", "Adapter base class for external reasoning backends"],
            ["load_navexa_env", "Explicit env loader helper"],
            ["get_model_pricing", "Pricing lookup helper"]
          ]
        )
      }
    ],
    sampleOutput: [
      {
        title: "Public import pattern",
        body: "Prefer top-level imports in examples unless you are reading internals.",
        language: "python",
        code: `from navexa import (
    index_structured_document_tree,
    save_document_tree,
    fetch_document_tree,
    run_reasoning_rag,
    BaseExternalLLM,
)`
      }
    ],
    commonMistakes: [
      {
        mistake: "Importing internal modules in user-facing examples",
        fix: "Use top-level `navexa` imports for public docs unless you are explicitly documenting internals."
      },
      {
        mistake: "Teaching `index_document_tree` as the main wrapper",
        fix: "Keep typed wrappers first and move `index_document_tree` to compatibility notes."
      }
    ],
    advancedOptions: [
      {
        title: "Tree reasoning accepts either model_config or an external adapter",
        body: "Internal providers use `model_config`. External backends use `BaseExternalLLM` adapter instances."
      }
    ],
    deprecatedNotes: [
      {
        title: "Backward-compatible wrapper still exists",
        body: "`index_document_tree(...)` remains for compatibility, but new examples should use the typed wrappers."
      }
    ],
    tryIt: [
      "Compare your code sample imports to this page.",
      "Replace any internal-import examples with top-level imports where possible.",
      "Move old wrapper usage into compatibility notes."
    ],
    nextSteps: [
      next("Output Schema (Canonical)", "/docs/output-schema"),
      next("Compatibility and Deprecated", "/docs/compatibility-deprecated")
    ]
  }),
  createArticle({
    id: "output-schema",
    category: "Reference",
    title: "Output Schema (Canonical)",
    description:
      "Use this page as the canonical output reference. It shows one realistic `tree_navexa.json` sample, one realistic `validation_report.json` sample, and the plain-English meaning of the important keys.",
    whatThisPageIsFor: [
      "Keep one canonical schema explanation instead of repeating partial schema fragments across multiple pages.",
      "Explain the saved tree and validation report in the order users actually inspect them.",
      "Highlight the newest pipeline metadata fields that matter for debugging."
    ],
    whenToUse: [
      "You are inspecting saved outputs",
      "You are wiring Navexa output into another system",
      "You need to understand where mode, parser, model, warnings, and summary metadata live"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "tree_navexa.json sample",
        body: "This is the canonical saved tree format that downstream workflows should treat as the default artifact.",
        language: "json",
        code: treeSampleJson
      },
      {
        title: "tree_navexa.json key meanings",
        body: "Read the top-level keys first, then the `pipeline` object, then the `structure` nodes.",
        table: table(
          ["Key", "Meaning"],
          [
            ["doc_id / doc_name", "Stable document identifiers for the saved tree"],
            ["pages", "Document page count"],
            ["source", "Input PDF metadata such as absolute path, hash, and page count"],
            ["cost", "Usage and estimated pricing summary"],
            ["pipeline", "Resolved runtime metadata, outline metadata, parser settings, model metadata, warnings, and mode fields"],
            ["structure", "The canonical node hierarchy used by save/fetch and reasoning"]
          ]
        )
      },
      {
        title: "Important pipeline fields to inspect first",
        body: "These are the fields that most often explain why a run behaved the way it did.",
        table: table(
          ["pipeline field", "Meaning"],
          [
            ["document_type", "Which wrapper behavior was used"],
            ["requested_mode", "What you asked for"],
            ["effective_mode", "What Navexa actually used"],
            ["llm_required", "Whether the flow requires LLM"],
            ["summary_enabled", "Whether node summaries are present"],
            ["model_config", "Safe serialized model metadata without secrets"],
            ["parser_config", "Resolved grouped parser config"],
            ["warnings", "Recoverable parser/runtime warnings collected during the run"]
          ]
        )
      },
      {
        title: "validation_report.json sample",
        body: "Validation is optional, but it is the fastest quality report to compare between runs.",
        language: "json",
        code: validationSampleJson
      },
      {
        title: "validation_report.json key meanings",
        body: "Validation metrics mix core structure checks with flow-specific metrics added by the indexing pipeline.",
        table: table(
          ["Key", "Meaning"],
          [
            ["generated_at", "UTC timestamp for the report"],
            ["pipeline_version", "Pipeline version string"],
            ["metrics.node_count", "Total number of nodes in the saved structure"],
            ["metrics.empty_node_rate", "Fraction of nodes with empty full_text"],
            ["metrics.heading_anchor_match_rate", "How well headings aligned in flows that use them"],
            ["metrics.overlap_violations", "Whether segmentation overlap issues were detected"],
            ["metrics.duplicated_block_rate", "Whether segmentation duplicated content"],
            ["metrics.summary_coverage", "Share of nodes that received summaries when summaries were enabled"]
          ]
        )
      }
    ],
    sampleOutput: [
      {
        title: "Transcript note",
        body: "Transcript runs can include an extra top-level `transcript` object. Keep `tree_navexa.json` as the main canonical container either way.",
        language: "text",
        code: `Transcript runs may include:
tree_navexa["transcript"]`
      }
    ],
    commonMistakes: [
      {
        mistake: "Treating `tree_legacy_compat.json` as the main schema",
        fix: "Use `tree_navexa.json` as the canonical schema and compat only for migration consumers."
      },
      {
        mistake: "Reading only `structure` and ignoring `pipeline`",
        fix: "The `pipeline` object explains the runtime choices that produced the structure."
      }
    ],
    advancedOptions: [
      {
        title: "Outline and flow-specific fields vary by document type",
        body: "Some pipeline keys such as transcript metadata or outline verification fields appear only on the flows that use them."
      }
    ],
    deprecatedNotes: [
      {
        title: "Compat schema is not the primary reference",
        body: "Keep compatibility schema explanation on the final compatibility page, not in your first schema reading path."
      }
    ],
    tryIt: [
      "Open one saved tree and identify `requested_mode`, `effective_mode`, `model_config`, and `parser_config`.",
      "Open the validation report and compare node_count and summary_coverage.",
      "Use this page as the single schema reference instead of collecting partial tables from other pages."
    ],
    nextSteps: [
      next("Troubleshooting", "/docs/troubleshooting"),
      next("Compatibility and Deprecated", "/docs/compatibility-deprecated")
    ]
  }),
  createArticle({
    id: "troubleshooting",
    category: "Reference",
    title: "Troubleshooting",
    description:
      "Use this page to debug current Navexa behavior quickly. Start from the exact wrapper, saved pipeline metadata, and runtime error text instead of guessing from older examples.",
    whatThisPageIsFor: [
      "Help users debug the latest wrapper and CLI behavior.",
      "Keep current runtime rules above old assumptions.",
      "Point users back to inspect saved pipeline metadata instead of treating runs as opaque."
    ],
    whenToUse: [
      "A run fails fast",
      "Output does not match the mode or parser behavior you expected",
      "You are seeing differences between current docs and older examples"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Start from the exact wrapper and saved pipeline metadata",
        body: "The wrapper tells you which runtime rules apply. Then inspect the saved tree metadata before changing code."
      },
      {
        title: "Check the common current runtime errors",
        body: "Current code uses clearer fail-fast errors for missing model and credential cases.",
        language: "text",
        code: `mode='llm' requested but credentials are missing for selected provider.
mode='llm' requested but model is not configured.
document_type='transcript' requires LLM, but model or credentials are missing.`
      },
      {
        title: "Inspect output metadata and warnings",
        body: "If the run completed, the saved tree often tells you what happened faster than a long guesswork loop.",
        language: "python",
        code: `from navexa import fetch_document_tree

tree = fetch_document_tree("/absolute/path/out")

print(tree["pipeline"]["requested_mode"])
print(tree["pipeline"]["effective_mode"])
print(tree["pipeline"]["model_config"])
print(tree["pipeline"]["parser_config"])
print(tree["pipeline"]["warnings"])`
      }
    ],
    sampleOutput: [
      {
        title: "Current parser warning path",
        body: "Recoverable parser issues are surfaced in a structured way.",
        language: "json",
        code: `{
  "pipeline": {
    "warnings": [
      {
        "stage": "ocr",
        "message": "Recoverable parser warning message"
      }
    ]
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: "Using semi-structured troubleshooting rules from older versions",
        fix: "Current semi-structured indexing is optional-LLM, not strictly LLM-required."
      },
      {
        mistake: "Trying to fix transcript issues with parser_config",
        fix: "Transcript does not use the public parser path. Fix model configuration or transcript-specific prompt behavior instead."
      },
      {
        mistake: "Ignoring the `warnings` field after a run completed",
        fix: "Current code intentionally stores recoverable warnings in `tree_navexa.pipeline.warnings`."
      }
    ],
    advancedOptions: [
      {
        title: "Structured and semi-structured force markdown",
        body: "If you request `output_format=\"text\"` for those flows, current code warns and changes it back to markdown."
      },
      {
        title: "Use the step-by-step reasoning path to isolate failures",
        body: "When reasoning output is unclear, debug tree search, context extraction, and answer generation as separate stages."
      }
    ],
    tryIt: [
      "Read the exact runtime error text first.",
      "If a run completed, inspect `pipeline` metadata next.",
      "Only then change model or parser inputs."
    ],
    nextSteps: [
      next("Compatibility and Deprecated", "/docs/compatibility-deprecated"),
      next("Install and Verify", "/docs/install")
    ]
  }),
  createArticle({
    id: "compatibility-deprecated",
    category: "Reference",
    title: "Compatibility and Deprecated",
    description:
      "This page is intentionally last. It exists to help older code keep running while you migrate it to the current public API and docs style.",
    whatThisPageIsFor: [
      "Collect compatibility-only guidance in one place at the end of the docs.",
      "Map old calls and flags to the current grouped config path.",
      "Keep migration detail out of the top half of tutorial pages."
    ],
    whenToUse: [
      "You are migrating older notebooks, scripts, or CLI commands",
      "You found old examples that do not match the current docs",
      "You need temporary compatibility while updating downstream consumers"
    ],
    stepsTitle: "Minimum working flow",
    steps: [
      {
        title: "Migrate old model args",
        body: "Teach `model_config` first in new docs. Keep `model=` only when older code still depends on it.",
        table: table(
          ["Old path", "Current preferred path"],
          [
            ["model=...", "model_config={ provider, model, api_key, base_url, pricing_model }"],
            ["--model", "--model-config"]
          ]
        )
      },
      {
        title: "Migrate old parser args",
        body: "Move flat parser arguments into grouped parser_config for both Python and CLI.",
        table: table(
          ["Old path", "Current preferred path"],
          [
            ["parser_model", "parser_config.name"],
            ["output_format", "parser_config.output_format"],
            ["docling_options", "parser_config.options"],
            ["flat parser CLI flags", "--parser-config"]
          ]
        )
      },
      {
        title: "Migrate older indexing wrappers",
        body: "Typed wrappers make the document type explicit and reduce confusion in docs.",
        table: table(
          ["Older wrapper", "Current preferred wrapper"],
          [
            ["index_document_tree(...)", "index_structured_document_tree(...) by default"],
            ["semi wrapper docs that require LLM", "current semi wrapper docs with optional LLM"],
            ["transcript docs with parser args", "current transcript wrapper docs without parser args"]
          ]
        )
      },
      {
        title: "Treat compat output as a migration artifact",
        body: "Use `write_compat` or `--with-compat` only when a downstream consumer still needs `tree_legacy_compat.json`."
      }
    ],
    variablesTable: table(
      ["Compatibility item", "Current status", "Replacement"],
      [
        ["model=...", "Deprecated but still supported", "model_config"],
        ["--model", "Deprecated but still supported", "--model-config"],
        ["parser_model / output_format / docling_options", "Deprecated but still supported", "parser_config"],
        ["flat parser CLI flags", "Compatibility shorthands", "--parser-config"],
        ["index_document_tree", "Backward-compatible wrapper", "typed indexing wrappers"],
        ["write_compat / --with-compat", "Compatibility-only artifact export", "tree_navexa.json as canonical output"]
      ]
    ),
    sampleOutput: [
      {
        title: "Typical compatibility warnings",
        body: "These warnings are a sign to migrate the example, not to teach the old pattern as first-class behavior.",
        language: "text",
        code: `FutureWarning: model is deprecated. Prefer model_config.
DeprecationWarning: parser_model, output_format, and docling_options are deprecated.
UserWarning: --model-config and legacy --model were both provided. --model wins for compatibility.`
      }
    ],
    commonMistakes: [
      {
        mistake: "Leaving compatibility examples mixed into beginner tutorials",
        fix: "Keep them here or at the very bottom of a page so the current public path stays clear."
      },
      {
        mistake: "Treating compatibility support as endorsement",
        fix: "Support exists so older code can keep running during migration, not because it is the recommended path."
      }
    ],
    advancedOptions: [
      {
        title: "Migrate gradually if production code depends on old behavior",
        body: "It is acceptable to keep compatibility code temporarily as long as new docs and new examples teach the current path."
      }
    ],
    tryIt: [
      "Pick one old example and rewrite it to the current grouped config path.",
      "Move any remaining old pattern into a migration-only note.",
      "Keep this page last in the reading order."
    ],
    links: [
      { label: "Release notes", href: RELEASE_URL },
      { label: "Repository", href: REPO_URL }
    ]
  })
];

const GROUP_OVERVIEW_SUFFIX = "-overview";

function toGroupParent(section) {
  return {
    id: section.id,
    category: section.category,
    title: section.title,
    description: section.description,
    groupOnly: true
  };
}

function toOverviewChild(section) {
  return {
    ...section,
    id: `${section.id}${GROUP_OVERVIEW_SUFFIX}`,
    navParentId: section.id,
    title: "Overview"
  };
}

function buildGroupedSections(allSections) {
  const sectionById = new Map(allSections.map((section) => [section.id, section]));
  const output = [];
  const pushed = new Set();

  for (const section of allSections) {
    if (pushed.has(section.id)) continue;
    if (section.navParentId) continue;

    const children = allSections.filter((item) => item.navParentId === section.id);
    if (!children.length) {
      output.push(section);
      pushed.add(section.id);
      continue;
    }

    output.push(toGroupParent(section));
    pushed.add(section.id);

    const overviewId = `${section.id}${GROUP_OVERVIEW_SUFFIX}`;
    const explicitOverview = children.find((item) => item.id === overviewId);
    if (explicitOverview) {
      output.push(explicitOverview);
      pushed.add(explicitOverview.id);
    } else {
      const autoOverview = toOverviewChild(section);
      output.push(autoOverview);
      pushed.add(autoOverview.id);
    }

    for (const child of children) {
      if (child.id === overviewId) continue;
      output.push(child);
      pushed.add(child.id);
    }
  }

  for (const section of allSections) {
    if (pushed.has(section.id)) continue;
    if (!section.navParentId || sectionById.has(section.navParentId)) {
      output.push(section);
      pushed.add(section.id);
    }
  }

  return output;
}

export const sections = buildGroupedSections(rawSections);

export const groupOrder = ["Get started", "Core concepts", "Reference"];

export function getSectionById(id) {
  return sections.find((section) => section.id === id) || null;
}

export function getSectionIndex(id) {
  return sections.findIndex((section) => section.id === id);
}

export function getFirstChildSection(parentId) {
  return sections.find((section) => section.navParentId === parentId) || null;
}

export function getPrevNext(id) {
  const navigable = sections.filter((section) => !section.groupOnly);
  const currentIndex = navigable.findIndex((section) => section.id === id);
  if (currentIndex < 0) {
    return { previous: null, next: null };
  }
  return {
    previous: currentIndex > 0 ? navigable[currentIndex - 1] : null,
    next: currentIndex < navigable.length - 1 ? navigable[currentIndex + 1] : null
  };
}

export function groupSections(allSections = sections) {
  const grouped = new Map(groupOrder.map((name) => [name, []]));
  for (const section of allSections) {
    const category = groupOrder.includes(section.category) ? section.category : "Reference";
    grouped.get(category).push(section);
  }
  return grouped;
}

function pushBlockText(values, blocks) {
  if (!Array.isArray(blocks)) return;
  for (const block of blocks) {
    values.push(block.title, block.body);
    if (Array.isArray(block.bullets)) values.push(...block.bullets);
    if (block.code) values.push(block.code);
  }
}

function flattenPageText(section) {
  const values = [];
  values.push(section.title, section.description, section.category);
  if (Array.isArray(section.whatThisPageIsFor)) values.push(...section.whatThisPageIsFor);
  if (Array.isArray(section.whenToUse)) values.push(...section.whenToUse);
  if (Array.isArray(section.prerequisites)) values.push(...section.prerequisites);
  if (Array.isArray(section.tryIt)) values.push(...section.tryIt);
  if (Array.isArray(section.commonMistakes)) {
    for (const item of section.commonMistakes) {
      values.push(item.mistake, item.fix);
    }
  }
  pushBlockText(values, section.steps);
  pushBlockText(values, section.sampleOutput);
  pushBlockText(values, section.advancedOptions);
  pushBlockText(values, section.deprecatedNotes);
  if (section.variablesTable?.rows?.length) {
    values.push(...section.variablesTable.headers);
    for (const row of section.variablesTable.rows) values.push(...row);
  }
  if (Array.isArray(section.links)) {
    for (const link of section.links) values.push(link.label, link.href);
  }
  if (Array.isArray(section.toc)) {
    for (const item of section.toc) values.push(item.title);
  }

  return values
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getSearchDocuments() {
  return sections
    .filter((section) => !section.groupOnly)
    .map((section) => ({
      id: section.id,
      category: section.category,
      title: section.title,
      description: section.description,
      headings: (section.toc || []).map((item) => item.title),
      text: flattenPageText(section)
    }));
}
