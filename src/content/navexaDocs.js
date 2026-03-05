const CORE_TOC = [
  { id: "what-you-build", title: "What you'll build" },
  { id: "prerequisites", title: "Prerequisites" },
  { id: "steps", title: "Step-by-step" },
  { id: "why-this-matters", title: "Why this matters" },
  { id: "common-mistakes", title: "Common mistakes" },
  { id: "try-it", title: "Try it" },
  { id: "next-steps", title: "Next steps" }
];

const asset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

function withCoreToc(section, extra = []) {
  return {
    ...section,
    toc: [...extra, ...CORE_TOC]
  };
}

export const sections = [
  withCoreToc(
    {
      id: "overview",
      category: "Get started",
      title: "Navexa Library Docs",
      description:
        "Build reliable PDF indexing and reasoning workflows with clear hierarchy, provenance, and grounded retrieval.",
      heroCode: {
        title: "First successful index",
        language: "python",
        code: `from navexa import index_structured_document_tree, save_document_tree

result = index_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="no-llm",
    verbosity="medium",
)

saved = save_document_tree(
    index_result=result,
    out_dir="/absolute/path/output",
    write_tree=True,
    write_validation=True,
)

print(saved.paths["tree_navexa"])`
      },
      products: [
        {
          title: "Structured Indexing",
          visualTitle: "index-tree",
          description: "Build hierarchy-aware trees with clean section boundaries.",
          image: asset("image1.png"),
          to: "/docs/indexing-modes"
        },
        {
          title: "Reasoning Retrieval",
          visualTitle: "reasoning",
          description: "Select the right nodes before generating grounded answers.",
          image: asset("image2.png"),
          to: "/docs/reasoning"
        },
        {
          title: "Transcript Understanding",
          visualTitle: "transcript",
          description: "Group transcript segments into topics with strong traceability.",
          image: asset("image3.png"),
          to: "/docs/indexing-modes"
        }
      ],
      whatYouBuild: [
        "A repeatable indexing workflow that converts PDFs into `tree_navexa.json`.",
        "A retrieval workflow that selects relevant nodes before answering.",
        "A practical understanding of when to use each indexing mode."
      ],
      prerequisites: [
        "Python 3.10+ environment",
        "A sample PDF file",
        "Optional LLM key for enhanced outline/summaries"
      ],
      steps: [
        {
          title: "Start with a deterministic index",
          body: "Use `mode=\"no-llm\"` first. This validates parser and file paths before model costs."
        },
        {
          title: "Inspect tree quality",
          body: "Open `tree_navexa.json` and confirm top-level sections and child hierarchy look correct."
        },
        {
          title: "Layer reasoning retrieval",
          body: "Use tree search + extracted context to produce grounded answers."
        }
      ],
      whyThisMatters: [
        "Section-aware retrieval reduces random context stuffing.",
        "Tree nodes preserve provenance, making answers auditable.",
        "You can start cheap (no-LLM) and upgrade to LLM-assisted mode when needed."
      ],
      commonMistakes: [
        {
          mistake: "Starting with LLM mode before environment is stable",
          fix: "Run a no-LLM smoke index first, then enable model/key."
        },
        {
          mistake: "Using relative PDF paths in notebooks",
          fix: "Use absolute paths for repeatable runs across terminals and notebooks."
        }
      ],
      tryIt: [
        "Index one PDF in `no-llm` mode.",
        "Open the output tree and identify one parent-child branch.",
        "Ask one question using reasoning retrieval and compare answer quality."
      ],
      nextSteps: [
        {
          title: "Install and verify",
          body: "Set up a clean environment and confirm the CLI works.",
          to: "/docs/install"
        },
        {
          title: "Quickstart: index your first PDF",
          body: "Run an end-to-end index and inspect the output tree.",
          to: "/docs/quickstart"
        }
      ],
      links: [
        {
          label: "Navexa package source",
          href: "https://github.com/deBUGger404/navexa"
        }
      ]
    },
    [
      { id: "hero-quickstart", title: "Developer quickstart" },
      { id: "products", title: "Core capabilities" }
    ]
  ),
  withCoreToc({
    id: "install",
    category: "Get started",
    title: "Install and Verify",
    description:
      "Install Navexa in a clean environment, verify the CLI, then run a tiny smoke index that is easy to debug.",
    whatYouBuild: [
      "A clean installation flow that you and your team can copy-paste.",
      "A quick verification checklist that works in both terminal and notebooks."
    ],
    prerequisites: [
      "Python 3.10+",
      "Terminal access",
      "One sample PDF file",
      "Write access to an output folder"
    ],
    steps: [
      {
        title: "Create a fresh environment",
        body: "Start clean to avoid version conflicts between Docling, Transformers, and notebooks.",
        language: "bash",
        code: `python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U pip
python -m pip install -U navexa`
      },
      {
        title: "Choose an install option (when needed)",
        body:
          "If you are developing Navexa, use an editable install. If you're using notebooks, install the notebook extra to avoid the common progress-bar warning.",
        language: "bash",
        code: `# Most users (PyPI)
python -m pip install -U navexa

# Notebooks (removes common tqdm warning)
python -m pip install -U "navexa[notebook]"

# Development (editable install from a local clone)
cd /path/to/navexa
python -m pip install -e .

# Install from Git (if hosted)
python -m pip install git+https://github.com/deBUGger404/navexa.git`
      },
      {
        title: "Section 1: Verify Python API (library)",
        body:
          "First confirm the Python package works in your current environment. This is your library-level health check.",
        language: "bash",
        code: `python - <<'PY'
import navexa
print("import_ok")
print("version:", getattr(navexa, "__version__", "unknown"))
PY

# Expected output
# import_ok
# version: 0.1.1`
      },
      {
        title: "Section 2: Verify CLI, fix PATH if needed, then re-check",
        body:
          "Now test the terminal command. If it is not found, add PATH, reload shell, and check again.",
        language: "bash",
        code: `# 1) CLI test
which navexa-index
navexa-index --help

# Example of failure output:
# which navexa-index
# (no output)
# navexa-index --help
# zsh: command not found: navexa-index

# If you see "command not found", apply PATH fix:

# macOS (zsh)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Linux (bash)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Windows PowerShell
$UserBase = python -m site --user-base
$ScriptsPath = "$UserBase\\Scripts"
[Environment]::SetEnvironmentVariable("Path", "$env:Path;$ScriptsPath", "User")
$env:Path = "$env:Path;$ScriptsPath"

# Windows CMD
for /f "delims=" %i in ('python -m site --user-base') do set "USERBASE=%i"
set "PATH=%PATH%;%USERBASE%\\Scripts"

# 2) Re-check after PATH fix
which navexa-index
where navexa-index
navexa-index --help`
      },
      {
        title: "Run smoke command",
        body:
          "Use `no-llm` + `structured` for the first run. It is deterministic and costs $0 in LLM usage.",
        language: "bash",
        code: `navexa-index \n\
  --pdf /absolute/path/document.pdf \n\
  --out-dir /absolute/path/out \n\
  --mode no-llm \n\
  --document-type structured \n\
  --output-format markdown \n\
  --verbose medium \n\
  --with-validation`
      }
    ],
    whyThisMatters: [
      "A deterministic smoke run catches file and parser issues early.",
      "It prevents expensive debugging in LLM mode."
    ],
    commonMistakes: [
      {
        mistake: "Mixing environments (terminal uses one Python, notebook uses another)",
        fix: "In your notebook, print `sys.executable` and make sure it matches your intended environment."
      },
      {
        mistake: "Using a relative PDF path",
        fix: "Use an absolute PDF path so your code works from any folder."
      },
      {
        mistake: "Turning on LLM mode before credentials are set",
        fix: "Do one no-LLM run first. Then set `OPENAI_API_KEY` or `AZURE_OPENAI_API_KEY` and rerun in LLM mode."
      }
    ],
    tryIt: [
      "Run the smoke command with `--verbose high`.",
      "Confirm `tree_navexa.json` and `validation_report.json` exist in your output directory.",
      "Open `tree_navexa.json` and check that top-level sections look reasonable."
    ],
    nextSteps: [
      {
        title: "Quickstart: index your first PDF",
        body: "Run an end-to-end index and inspect the output tree.",
        to: "/docs/quickstart"
      },
      {
        title: "Environment and LLM setup",
        body: "Configure OpenAI or Azure credentials for LLM mode.",
        to: "/docs/env"
      }
    ]
  }),
  withCoreToc({
    id: "quickstart",
    category: "Get started",
    title: "Quickstart: Index Your First PDF",
    description:
      "Run the smallest useful workflow: index one PDF, save outputs, and confirm the tree structure.",
    whatYouBuild: [
      "A local run that outputs `tree_navexa.json` and `validation_report.json`.",
      "A baseline to compare no-LLM versus LLM mode later."
    ],
    prerequisites: [
      "Navexa installed (see Install and Verify page)",
      "A readable PDF file",
      "Write access to output directory"
    ],
    steps: [
      {
        title: "Index in no-LLM mode (recommended first run)",
        body: "This gives deterministic output and zero LLM cost. Use absolute paths for repeatability.",
        language: "python",
        code: `from navexa import index_structured_document_tree

result = index_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="no-llm",
    verbosity="medium",
)`
      },
      {
        title: "Save outputs",
        body: "Save the canonical tree and the validation report. If `out_dir=None`, Navexa writes to `<pdf_dir>/<pdf_stem>_navexa_out`.",
        language: "python",
        code: `from navexa import save_document_tree

saved = save_document_tree(
    index_result=result,
    out_dir="/absolute/path/output",   # or None for default
    write_tree=True,
    write_validation=True,
    write_compat=False,
)
print(saved.paths)`
      },
      {
        title: "Inspect the generated files",
        body: "Open the tree and confirm the first few nodes look right (titles, nesting, and text).",
        language: "bash",
        code: `ls -la /absolute/path/output

# Optional: quick peek at top-level keys
python - <<'PY'
import json
tree = json.load(open('/absolute/path/output/tree_navexa.json'))
print(tree.keys())
print('top_level_nodes:', len(tree.get('structure', [])))
PY`
      },
      {
        title: "Optional: rerun in LLM mode",
        body:
          "LLM mode improves table-of-contents detection and can generate summaries. Set credentials first, then rerun with `mode=\"llm\"`.",
        language: "bash",
        code: `export OPENAI_API_KEY="..."
export OPENAI_MODEL_NAME="gpt-4.1-mini"

python - <<'PY'
from navexa import index_structured_document_tree

result = index_structured_document_tree(
    pdf_path="/absolute/path/document.pdf",
    mode="llm",
    model=None,
    verbosity="medium",
)

print(result.tree_navexa["cost"])
PY`
      }
    ],
    whyThisMatters: [
      "You can validate parsing and hierarchy before spending tokens.",
      "Saved artifacts make debugging and iteration easier."
    ],
    commonMistakes: [
      {
        mistake: "Skipping validation output",
        fix: "Keep `write_validation=True` during initial development."
      },
      {
        mistake: "Trying transcript mode on non-transcript docs",
        fix: "Use structured or semi-structured for formal PDFs."
      }
    ],
    tryIt: [
      "Change `verbosity` from `medium` to `high` and inspect logs.",
      "Re-run with a second PDF and compare node counts."
    ],
    nextSteps: [
      {
        title: "Save and load trees",
        body: "Learn how to persist the right artifacts and reload them safely.",
        to: "/docs/save-fetch"
      },
      {
        title: "Reasoning retrieval workflow",
        body: "Select the right nodes before generating grounded answers.",
        to: "/docs/reasoning"
      }
    ]
  }),
  withCoreToc({
    id: "env",
    category: "Get started",
    title: "Environment and LLM Setup",
    description:
      "Configure keys, model selection, verbosity, and parser defaults. This page is your runtime contract.",
    whatYouBuild: [
      "A reusable `.env` setup for OpenAI or Azure.",
      "Predictable model/mode behavior across scripts and notebooks."
    ],
    prerequisites: [
      "One API provider account (OpenAI or Azure OpenAI)",
      "Access to edit environment variables or a `.env` file"
    ],
    steps: [
      {
        title: "Understand how Navexa loads environment",
        body:
          "Navexa can read config from OS environment variables or `.env` files. If a value exists in multiple places, the first match wins.",
        language: "text",
        code: `Env loading order:
1) NAVEXA_ENV_FILE (explicit .env file path)
2) .env in your current directory (or parent)
3) repo-local .env (fallback)`
      },
      {
        title: "Configure OpenAI credentials",
        body:
          "Minimal OpenAI setup. Set provider to `openai`. Start with `NAVEXA_MODE=no-llm`, then enable `llm` after this works.",
        language: "dotenv",
        code: ` # OpenAI auth
NAVEXA_LLM_PROVIDER=openai
OPENAI_API_KEY=...
OPENAI_MODEL_NAME=gpt-4.1-mini

# Docling extraction
NAVEXA_MODE=llm
NAVEXA_VERBOSE=medium
NAVEXA_IF_ADD_NODE_SUMMARY=yes`
      },
      {
        title: "Or configure Azure OpenAI",
        body: "Set provider to `azure`. Use deployment name for runtime and raw model name for pricing metadata.",
        bullets: [
          "Use `AZURE_DEPLOYMENT_NAME` for actual API requests in Azure OpenAI.",
          "Use `AZURE_DEPLOYMENT_RAW_NAME` as the raw model family name (for example `gpt-4.1-mini`).",
          "Keep both values: deployment name for runtime, raw model name for exact pricing lookup."
        ],
        language: "dotenv",
        code: `# Azure OpenAI auth
NAVEXA_LLM_PROVIDER=azure
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_BASE_URL=https://<resource>.openai.azure.com/openai/v1
AZURE_DEPLOYMENT_NAME=<deployment-name>
AZURE_DEPLOYMENT_RAW_NAME=gpt-4.1-mini

# Docling extraction
NAVEXA_MODE=llm
NAVEXA_VERBOSE=medium
NAVEXA_IF_ADD_NODE_SUMMARY=yes`
      },
      {
        title: "Use a custom .env file path (optional)",
        body: "If you don’t want a `.env` in your working directory, point Navexa to a specific file.",
        language: "bash",
        code: `export NAVEXA_ENV_FILE="/absolute/path/to/.env"`
      },
      {
        title: "Start from .env.example (optional)",
        body: "If you cloned the repo, copy `.env.example` and fill in your values.",
        language: "bash",
        code: `cp .env.example .env\n# edit .env`
      },
      {
        title: "Set parser behavior",
        body: "Choose markdown or text output and OCR policy.",
        language: "dotenv",
        code: `NAVEXA_PARSER_MODEL=docling
NAVEXA_DOCLING_OUTPUT_FORMAT=markdown
NAVEXA_DOCLING_OCR=0
NAVEXA_DOCLING_IMAGE_MODE=placeholder`
      },
      {
        title: "LLM credential variables (reference)",
        body: "You only need one provider set (OpenAI or Azure OpenAI).",
        table: {
          headers: ["Variable", "Purpose", "Example"],
          rows: [
            ["NAVEXA_LLM_PROVIDER", "LLM provider switch", "openai or azure"],
            ["OPENAI_API_KEY", "OpenAI API key (openai provider)", "sk-..."],
            ["OPENAI_MODEL_NAME", "OpenAI model name (openai provider)", "gpt-4.1-mini"],
            ["AZURE_OPENAI_API_KEY", "Azure API key (azure provider)", "..."],
            ["AZURE_OPENAI_BASE_URL", "Azure base URL (azure provider)", "https://.../openai/v1"],
            ["AZURE_DEPLOYMENT_NAME", "Azure deployment name (azure provider)", "my-deployment"],
            ["AZURE_DEPLOYMENT_RAW_NAME", "Raw model name for pricing map/metadata", "gpt-4.1-mini"]
          ]
        }
      },
      {
        title: "Model resolution (when model=None)",
        body:
          "If you don’t pass `model=...`, Navexa resolves from env by provider. If required model env is missing, throw a clear error (do not silently fallback).",
        table: {
          headers: ["Priority", "Resolution / error"],
          rows: [
            ["1", "explicit model= parameter"],
            ["2", "if provider=openai: OPENAI_MODEL_NAME"],
            ["3", "if provider=azure: AZURE_DEPLOYMENT_NAME"],
            [
              "4",
              "if missing: raise error -> 'Model is not configured. Pass model=... explicitly, or set OPENAI_MODEL_NAME (openai) / AZURE_DEPLOYMENT_NAME (azure).'"
            ]
          ]
        }
      },
      {
        title: "Pipeline defaults (reference)",
        body: "These variables control default behavior when you don’t pass explicit parameters.",
        table: {
          headers: ["Variable", "Purpose", "Default"],
          rows: [
            ["NAVEXA_MODE", "Runtime mode (llm or no-llm)", "no-llm"],
            ["NAVEXA_DOCUMENT_TYPE", "Default document type", "structured"],
            ["NAVEXA_VERBOSE", "Verbosity (low/medium/high or 1/2/3)", "medium"],
            ["NAVEXA_IF_ADD_NODE_SUMMARY", "Include summaries (yes/no)", "yes"],
            ["NAVEXA_MAX_TOKEN_NUM_EACH_NODE", "Max tokens per node", "12000"],
            ["NAVEXA_MAX_PAGE_NUM_EACH_NODE", "Max pages per node", "8"],
            ["NAVEXA_DISABLE_SUMMARY", "Force-disable summaries (0/1)", "0"]
          ]
        }
      },
      {
        title: "Docling parser controls (reference)",
        body: "These variables tune PDF parsing and OCR. Start with OCR off unless the PDF is scanned.",
        table: {
          headers: ["Variable", "Purpose", "Default"],
          rows: [
            ["NAVEXA_PARSER_MODEL", "Parser backend", "docling"],
            ["NAVEXA_DOCLING_OUTPUT_FORMAT", "markdown or text", "markdown"],
            ["NAVEXA_DOCLING_OCR", "Enable OCR (0/1)", "0"],
            ["NAVEXA_RAPIDOCR_BACKEND", "OCR backend", "torch"],
            ["NAVEXA_DOCLING_FORCE_FULL_PAGE_OCR", "Force OCR on full page (0/1)", "0"],
            ["NAVEXA_DOCLING_PICTURE_DESCRIPTION", "Picture descriptions (0/1)", "0"],
            ["NAVEXA_DOCLING_REMOTE_SERVICES", "Enable remote services (0/1)", "0"],
            ["NAVEXA_DOCLING_IMAGE_MODE", "placeholder/embedded/referenced/none", "placeholder"],
            ["NAVEXA_DOCLING_QUIET", "Reduce Docling/RapidOCR logs (0/1)", "1"]
          ]
        }
      },
      {
        title: "Load env in Python (optional)",
        body: "If you prefer, you can load `.env` from Python before calling any APIs.",
        language: "python",
        code: `from navexa import load_navexa_env

load_navexa_env()  # reads NAVEXA_ENV_FILE / .env as described above`
      }
    ],
    whyThisMatters: [
      "Most runtime issues come from missing keys, wrong model names, or mismatched parser settings.",
      "A stable environment makes indexing behavior reproducible."
    ],
    commonMistakes: [
      {
        mistake: "Using `mode=llm` without a key",
        fix: "Set provider first (`NAVEXA_LLM_PROVIDER`) and then set matching credentials: OpenAI (`OPENAI_API_KEY`) or Azure (`AZURE_OPENAI_API_KEY` + `AZURE_OPENAI_BASE_URL`)."
      },
      {
        mistake: "Forgetting that transcript and semi-structured flows require LLM",
        fix: "Treat those flows as fail-fast if key/model are missing."
      }
    ],
    tryIt: [
      "Run one `no-llm` index and one `llm` index on the same PDF.",
      "Compare `cost` and `summary_coverage` in output JSON."
    ],
    nextSteps: [
      {
        title: "Choose your indexing function",
        body: "Map document quality to the right API function.",
        to: "/docs/indexing-modes"
      }
    ]
  }),
  withCoreToc({
    id: "indexing-modes",
    category: "Core concepts",
    title: "Types of Data Navexa Handles",
    description:
      "Use this page as your decision guide. Then open each subtype page in the left menu for full, step-by-step implementation details.",
    whatYouBuild: [
      "A quick decision map for structured, semi-structured, unstructured, and transcript documents.",
      "A stable workflow for selecting the right indexing API before coding."
    ],
    prerequisites: [
      "Basic familiarity with Navexa indexing API",
      "Sample documents representing each document type"
    ],
    datasets: [
      {
        title: "Structured data",
        description: "Clean sectioned PDFs with stable heading order.",
        image: asset("type1.png"),
        to: "/docs/data-structured"
      },
      {
        title: "Semi-structured data",
        description: "Inconsistent heading styles normalized with LLM support.",
        image: asset("type2.png"),
        to: "/docs/data-semi-structured"
      },
      {
        title: "Unstructured data",
        description: "Weak/missing headings where Navexa synthesizes structure.",
        image: asset("type3.png"),
        to: "/docs/data-unstructured"
      },
      {
        title: "Transcript data",
        description: "Call/interview transcripts grouped into topic nodes.",
        image: asset("type4.png"),
        to: "/docs/data-transcript"
      }
    ],
    steps: [
      {
        title: "Structured documents (best default)",
        body:
          "Choose this for manuals, labels, and regulatory PDFs where headings are clear and ordered.",
        bullets: [
          "Regulatory labels and prescribing information PDFs.",
          "Product manuals with numbered chapters and subchapters.",
          "SOP documents with consistent heading hierarchy."
        ]
      },
      {
        title: "Semi-structured documents",
        body:
          "Choose this when headings exist but numbering/order is inconsistent. LLM is required by design.",
        bullets: [
          "Compliance/policy PDFs where some headings are numbered and others are plain text.",
          "Legacy reports where formatting changes between pages.",
          "Documents merged from multiple templates."
        ]
      },
      {
        title: "Unstructured documents",
        body: "Choose this for weak/no heading documents. Navexa synthesizes a usable hierarchy.",
        bullets: [
          "Narrative reports with long paragraphs and minimal section markers.",
          "OCR-heavy scanned files where heading detection is unreliable.",
          "Free-form notes and loosely formatted project documents."
        ]
      },
      {
        title: "Transcript documents",
        body:
          "Choose this for calls/interviews. Navexa groups transcript nodes by topic with source-backed spans.",
        bullets: [
          "Call logs exported as transcripts.",
          "Meeting recordings converted to text.",
          "Customer support conversations and interview transcripts."
        ]
      },
      {
        title: "Open the detailed subtype pages",
        body:
          "Use the left sidebar subsection under this page to open detailed pages for Structured, Semi-structured, Unstructured, and Transcript data. Each page includes setup, variable changes, save flow, and checks.",
        table: {
          headers: ["Subtype page", "When to use", "LLM requirement", "Example input"],
          rows: [
            ["Structured data", "Clean sectioned PDFs", "Optional", "Regulatory label / technical manual"],
            ["Semi-structured data", "Inconsistent heading styles", "Required", "Mixed-format policy/compliance PDF"],
            ["Unstructured data", "Weak/missing headings", "Optional (recommended)", "Narrative report / OCR-heavy file"],
            ["Transcript data", "Interview/call transcripts", "Required", "Meeting transcript / support call"]
          ]
        }
      }
    ],
    whyThisMatters: [
      "Wrong function selection leads to weak topic boundaries and noisy retrieval.",
      "Correct flow selection improves both answer quality and cost efficiency."
    ],
    commonMistakes: [
      {
        mistake: "Using transcript mode for formal manuals",
        fix: "Use structured mode for heading-heavy docs and transcript mode only for conversation-style text."
      },
      {
        mistake: "Assuming all modes require LLM",
        fix: "Only transcript is strictly LLM-required by pipeline. Semi-structured wrapper enforces LLM mode, while unstructured can run with or without LLM."
      },
      {
        mistake: "Forgetting prompt overrides exist",
        fix: "Semi-structured and transcript flows accept prompt template overrides if you need custom behavior."
      }
    ],
    tryIt: [
      "Run the same PDF with structured and unstructured modes.",
      "Compare node hierarchy depth and retrieval relevance."
    ],
    nextSteps: [
      {
        title: "Structured data guide",
        body: "Start with the safest default mode.",
        to: "/docs/data-structured"
      }
    ]
  }),
  withCoreToc({
    id: "data-structured",
    navParentId: "indexing-modes",
    category: "Core concepts",
    title: "Structured data",
    description:
      "For clean PDFs with stable headings. This is the recommended starting mode for most teams.",
    whatYouBuild: [
      "A clean hierarchy tree with strong parent-child boundaries.",
      "A reliable baseline output you can compare with other modes."
    ],
    prerequisites: ["Sectioned PDF", "Navexa installed", "Optional LLM credentials"],
    steps: [
      {
        title: "Index a structured PDF",
        body: "Start with `no-llm` to verify parser, paths, and output quality quickly.",
        language: "python",
        code: `from navexa import index_structured_document_tree

result = index_structured_document_tree(
    pdf_path="/absolute/path/structured.pdf",
    mode="no-llm",
    verbosity="medium",
    if_add_node_summary="no",
)`
      },
      {
        title: "Enable LLM only when needed",
        body:
          "If headings/page mapping need improvement, switch to `mode=\"llm\"` and add provider model/deployment.",
        language: "python",
        code: `result = index_structured_document_tree(
    pdf_path="/absolute/path/structured.pdf",
    mode="llm",
    model="gpt-4.1-mini",  # or Azure deployment name
    if_add_node_summary="yes",
)`
      },
      {
        title: "Save outputs",
        body: "Persist canonical tree and validation report for QA and debugging.",
        language: "python",
        code: `from navexa import save_document_tree

saved = save_document_tree(
    index_result=result,
    out_dir="/absolute/path/out",
    write_tree=True,
    write_validation=True,
    write_compat=False,
)
print(saved.paths)`
      },
      {
        title: "Variables you usually change",
        body:
          "Only structured-flow inputs are listed here (`index_structured_document_tree(...)`).",
        table: {
          headers: ["Parameter", "Why change it", "Common value"],
          rows: [
            ["pdf_path", "Input document location", "/absolute/path/file.pdf"],
            ["model", "Choose model/deployment for LLM mode", "gpt-4.1-mini or Azure deployment"],
            ["mode", "deterministic vs LLM-assisted", "no-llm | llm"],
            ["verbosity", "debug depth", "low | medium | high"],
            ["parser_model", "parser backend selection", "docling"],
            ["output_format", "parser output style", "markdown | text"],
            ["docling_options", "Override parser profile/OCR in code", "{ profile: 'balanced', ... }"],
            ["max_token_num_each_node", "split large nodes", "12000 or lower"],
            ["max_page_num_each_node", "split long page spans", "8 or lower"],
            ["if_add_node_summary", "cost vs summary coverage", "no | yes"]
          ]
        }
      }
    ],
    whyThisMatters: [
      "Structured mode gives the most stable tree when source headings are good.",
      "It minimizes avoidable complexity in early implementation."
    ],
    commonMistakes: [
      {
        mistake: "Running LLM mode before no-LLM baseline",
        fix: "Run once with `no-llm` first so failures are easier to isolate."
      }
    ],
    tryIt: [
      "Run once with summaries off, then on, and compare cost block in output JSON.",
      "Check top-level titles in `tree_navexa.json` for heading quality."
    ],
    nextSteps: [
      {
        title: "Semi-structured data",
        body: "Use this when heading quality drops.",
        to: "/docs/data-semi-structured"
      }
    ]
  }),
  withCoreToc({
    id: "data-semi-structured",
    navParentId: "indexing-modes",
    category: "Core concepts",
    title: "Semi-structured data",
    description:
      "For PDFs where headings exist but formats are inconsistent. This flow requires LLM.",
    whatYouBuild: [
      "A normalized heading tree from inconsistent document structure.",
      "Cleaner parent/child grouping than naive heading parsing."
    ],
    prerequisites: ["LLM credentials configured", "Input PDF with inconsistent headings"],
    steps: [
      {
        title: "Run semi-structured index",
        body: "LLM is required here; Navexa fails fast if model/key are missing.",
        language: "python",
        code: `from navexa import index_semi_structured_document_tree

result = index_semi_structured_document_tree(
    pdf_path="/absolute/path/semi.pdf",
    model="gpt-4.1-mini",  # Azure: deployment name
    verbosity="medium",
    if_add_node_summary="yes",
)`
      },
      {
        title: "Provider-specific model variable",
        body: "For Azure, pass deployment name at runtime and keep raw name in env for pricing metadata.",
        language: "dotenv",
        code: `# OpenAI
NAVEXA_LLM_PROVIDER=openai
OPENAI_MODEL_NAME=gpt-4.1-mini

# Azure OpenAI
NAVEXA_LLM_PROVIDER=azure
AZURE_DEPLOYMENT_NAME=my-gpt41mini-deployment
AZURE_DEPLOYMENT_RAW_NAME=gpt-4.1-mini`
      },
      {
        title: "Variables you usually change",
        body:
          "Only semi-structured inputs are listed here (`index_semi_structured_document_tree(...)`).",
        table: {
          headers: ["Parameter", "Why change it", "Common value"],
          rows: [
            ["pdf_path", "Input document location", "/absolute/path/semi.pdf"],
            ["model", "Choose model/deployment", "gpt-4.1-mini or Azure deployment"],
            ["verbosity", "Debug depth", "low | medium | high"],
            ["parser_model", "Parser backend", "docling"],
            ["output_format", "Parser output style", "markdown | text"],
            ["docling_options", "Override parser profile/OCR in code", "{ profile: 'balanced', ... }"],
            ["max_token_num_each_node", "Split large nodes", "12000 or lower"],
            ["max_page_num_each_node", "Split long page spans", "8 or lower"],
            ["if_add_node_summary", "Cost vs summary coverage", "no | yes"],
            ["semi_heading_prompt_template", "Custom heading normalization prompt", "custom template string"]
          ]
        }
      },
      {
        title: "Save and validate",
        body: "Save validation output to inspect anchor match and overlap metrics.",
        language: "python",
        code: `from navexa import save_document_tree
save_document_tree(result, "/absolute/path/out", write_tree=True, write_validation=True)`
      }
    ],
    whyThisMatters: [
      "Semi-structured docs often fail in strict heading parsers.",
      "LLM normalization improves hierarchy quality before retrieval."
    ],
    commonMistakes: [
      {
        mistake: "Using this flow without LLM config",
        fix: "Set provider and model/deployment first; this flow is intentionally fail-fast."
      }
    ],
    tryIt: [
      "Compare this mode against structured mode on the same noisy PDF.",
      "Inspect whether section nesting improved."
    ],
    nextSteps: [
      {
        title: "Unstructured data",
        body: "If headings are missing entirely, use unstructured flow.",
        to: "/docs/data-unstructured"
      }
    ]
  }),
  withCoreToc({
    id: "data-unstructured",
    navParentId: "indexing-modes",
    category: "Core concepts",
    title: "Unstructured data",
    description:
      "For weak/no heading documents. Navexa synthesizes a practical tree from raw content.",
    whatYouBuild: [
      "A usable tree when documents lack good section headers.",
      "A retrieval-ready structure from otherwise noisy content."
    ],
    prerequisites: ["Input PDF with weak heading quality", "Optional: LLM credentials for better section titles/summaries"],
    steps: [
      {
        title: "Run unstructured index",
        body: "Unstructured flow can run in `no-llm` or `llm`. Start with `no-llm`, then enable LLM for better section quality if needed.",
        language: "python",
        code: `from navexa import index_unstructured_document_tree

result = index_unstructured_document_tree(
    pdf_path="/absolute/path/unstructured.pdf",
    mode="no-llm",
    if_add_node_summary="no",
    verbosity="medium",
)`
      },
      {
        title: "Tune summary behavior",
        body: "Switch to LLM mode when you want stronger generated section titles/summaries.",
        language: "python",
        code: `result = index_unstructured_document_tree(
    pdf_path="/absolute/path/unstructured.pdf",
    mode="llm",
    model="gpt-4.1-mini",   # Azure: deployment name
    if_add_node_summary="yes",
)`
      },
      {
        title: "Variables you usually change",
        body:
          "Only unstructured inputs are listed here (`index_unstructured_document_tree(...)`).",
        table: {
          headers: ["Parameter", "Why change it", "Common value"],
          rows: [
            ["pdf_path", "Input document location", "/absolute/path/unstructured.pdf"],
            ["model", "Choose model/deployment", "gpt-4.1-mini or Azure deployment"],
            ["mode", "Choose deterministic or LLM-assisted", "no-llm | llm"],
            ["verbosity", "Debug depth", "low | medium | high"],
            ["parser_model", "Parser backend", "docling"],
            ["output_format", "Parser output style", "markdown | text"],
            ["docling_options", "Override parser profile/OCR in code", "{ profile: 'balanced', ... }"],
            ["max_token_num_each_node", "Split large nodes", "12000 or lower"],
            ["max_page_num_each_node", "Split long page spans", "8 or lower"],
            ["if_add_node_summary", "Cost vs summary coverage", "no | yes"]
          ]
        }
      },
      {
        title: "Save tree and reuse in reasoning flow",
        body: "Persist output then load for tree-search reasoning.",
        language: "python",
        code: `from navexa import save_document_tree, fetch_document_tree

save_document_tree(result, "/absolute/path/out", write_tree=True, write_validation=True)
tree = fetch_document_tree("/absolute/path/out")`
      }
    ],
    whyThisMatters: [
      "Many real operational docs do not have reliable heading structure.",
      "This mode gives you a practical fallback without custom preprocessing."
    ],
    commonMistakes: [
      {
        mistake: "Forgetting to set `mode` explicitly",
        fix: "Use `mode=\"no-llm\"` for deterministic runs, and `mode=\"llm\"` only when credentials/model are configured."
      }
    ],
    tryIt: [
      "Run with `if_add_node_summary=no` first to reduce cost.",
      "Then enable summaries and compare retrieval speed/readability."
    ],
    nextSteps: [
      {
        title: "Transcript data",
        body: "For calls/interviews, use transcript flow.",
        to: "/docs/data-transcript"
      }
    ]
  }),
  withCoreToc({
    id: "data-transcript",
    navParentId: "indexing-modes",
    category: "Core concepts",
    title: "Transcript data",
    description:
      "For conversation-style documents (calls/interviews). Navexa groups transcript nodes into topic sections with source-backed spans.",
    whatYouBuild: [
      "Topic-grouped transcript nodes with traceable source text spans.",
      "A tree structure you can query with reasoning retrieval."
    ],
    prerequisites: ["Transcript-like input text/PDF", "LLM credentials configured"],
    steps: [
      {
        title: "Run transcript index",
        body:
          "Transcript flow is LLM-required. It uses the transcript text extractor path; `output_format` does not currently change transcript parsing.",
        language: "python",
        code: `from navexa import index_transcript_document_tree

result = index_transcript_document_tree(
    pdf_path="/absolute/path/transcript.pdf",
    model="gpt-4.1-mini",   # Azure: deployment name
    verbosity="medium",
    if_add_node_summary="yes",
)`
      },
      {
        title: "Recommended transcript environment values",
        body:
          "Set transcript type and LLM provider values. Note: Docling output format/OCR flags are not used in transcript parsing path.",
        language: "dotenv",
        code: `NAVEXA_DOCUMENT_TYPE=transcript
NAVEXA_LLM_PROVIDER=openai
OPENAI_API_KEY=...
OPENAI_MODEL_NAME=gpt-4.1-mini`
      },
      {
        title: "Variables you usually change",
        body:
          "Only transcript inputs are listed here (`index_transcript_document_tree(...)`).",
        table: {
          headers: ["Parameter", "Why change it", "Common value"],
          rows: [
            ["pdf_path", "Input document location", "/absolute/path/transcript.pdf"],
            ["model", "Choose model/deployment", "gpt-4.1-mini or Azure deployment"],
            ["verbosity", "Debug depth", "low | medium | high"],
            ["parser_model", "Parser backend", "docling"],
            ["output_format", "Accepted for API parity; currently ignored in transcript parsing", "markdown or text"],
            ["docling_options", "Ignored for transcript flow (uses transcript text extractor)", "None"],
            ["max_token_num_each_node", "Split large topic nodes", "12000 or lower"],
            ["max_page_num_each_node", "Split long page spans", "8 or lower"],
            ["if_add_node_summary", "Cost vs summary coverage", "no | yes"],
            ["transcript_topic_prompt_template", "Custom topic extraction prompt", "custom template string"]
          ]
        }
      },
      {
        title: "Save + inspect topic structure",
        body: "Check top-level topic titles and child node boundaries.",
        language: "python",
        code: `from navexa import save_document_tree

saved = save_document_tree(
    index_result=result,
    out_dir="/absolute/path/out",
    write_tree=True,
    write_validation=True,
)
print(saved.paths["tree_navexa"])`
      }
    ],
    whyThisMatters: [
      "Transcript content is sequential and topic-shifting, unlike formal documents.",
      "Topic grouping improves reasoning recall and answer grounding."
    ],
    commonMistakes: [
      {
        mistake: "Expecting `output_format` to change transcript parsing",
        fix: "It currently does not affect transcript flow. Focus on `model`, `verbosity`, and `transcript_topic_prompt_template`."
      }
    ],
    tryIt: [
      "Open one topic node and verify source text continuity.",
      "Ask two questions that require different topic branches."
    ],
    nextSteps: [
      {
        title: "Save and load trees",
        body: "Persist and reload transcript trees safely.",
        to: "/docs/save-fetch"
      }
    ]
  }),
  withCoreToc({
    id: "save-fetch",
    category: "Core concepts",
    title: "Save and Load Trees",
    description:
      "Indexing returns memory-first results. Persist only the artifacts your workflow actually needs.",
    whatYouBuild: [
      "A clean output contract for apps, QA pipelines, and debugging.",
      "A reload pattern for tree, validation, and compatibility artifacts."
    ],
    prerequisites: [
      "A completed `IndexResult` object",
      "Read/write access to output directory"
    ],
    steps: [
      {
        title: "Save canonical output",
        body:
          "Always keep `tree_navexa.json` as the primary contract. If `out_dir=None`, Navexa saves to `<pdf_dir>/<pdf_stem>_navexa_out`.",
        language: "python",
        code: `from navexa import save_document_tree

saved = save_document_tree(
    index_result=result,
    out_dir="/absolute/path/out",
    write_tree=True,
    write_validation=True,
    write_compat=False,
)`
      },
      {
        title: "See what the output JSON looks like (sample)",
        body:
          "This is a simplified sample of `tree_navexa.json` so you can quickly understand what fields exist and what they contain.",
        language: "json",
        code: `{
  "doc_id": "sample_manual",
  "doc_name": "sample_manual",
  "pages": { "count": 113 },
  "pipeline_version": "v1",
  "source": {
    "pdf_path": "/absolute/path/sample_manual.pdf",
    "sha256": "db2f733a418567a0050bcc8f5ba526c5ccc12904db786353859995620cf326a1",
    "total_pages": 113
  },
  "cost": {
    "pricing_model": "gpt-4.1",
    "tier": "standard",
    "calls": 186,
    "input_tokens": 187963,
    "cached_input_tokens": 5632,
    "output_tokens": 26120,
    "total_tokens": 214083,
    "estimated_cost_usd": 0.587702
  },
  "pipeline": {
    "mode": "synthetic_table_of_contents",
    "table_of_contents_pages": [],
    "table_of_contents_entries": [
      { "structure": "Preface", "title": "Preface", "page": null, "physical_index": 5 },
      { "structure": "1", "title": "Introduction", "page": null, "physical_index": 8 }
    ],
    "verify_accuracy": 0.9812,
    "verify_incorrect_count": 3,
    "llm_pipeline_enabled": true,
    "steps": ["extract", "outline", "segment", "summarize"],
    "document_type": "structured",
    "summary_enabled": true,
    "max_token_num_each_node": 12000,
    "max_page_num_each_node": 8,
    "llm_required": false,
    "requested_mode": "llm",
    "effective_mode": "llm",
    "verbosity": "high",
    "parser_model": "docling",
    "output_format": "markdown"
  },
  "structure": [
    {
      "node_id": "0001",
      "title": "PREFACE / FRONT MATTER",
      "start_index": 1,
      "end_index": 4,
      "level": 0,
      "exclusive_text": "Front matter text only.",
      "full_text": "Front matter text only.",
      "children": [],
      "summary": "Front matter overview."
    },
    {
      "node_id": "0002",
      "title": "1 INTRODUCTION",
      "start_index": 8,
      "end_index": 12,
      "level": 1,
      "exclusive_text": "Introduction text only.",
      "full_text": "Introduction text + all child sections.",
      "children": [
        {
          "node_id": "0003",
          "title": "1.1 Scope",
          "start_index": 8,
          "end_index": 9,
          "level": 2,
          "exclusive_text": "Scope paragraph text.",
          "full_text": "Scope paragraph text.",
          "children": [],
          "summary": "Scope definition."
        }
      ],
      "summary": "Introduction summary."
    }
  ]
}`
      },
      {
        title: "Full key definitions (single table)",
        body:
          "Use this right after opening `tree_navexa.json`. This is the single source of truth for what each key means.",
        table: {
          headers: ["Key path", "Type", "Meaning (simple)"],
          rows: [
            ["doc_id", "string", "Internal ID of this indexed document"],
            ["doc_name", "string", "Human-readable document name"],
            ["pages.count", "int", "How many pages Navexa saw"],
            ["source.pdf_path", "string", "Original PDF location used in this run"],
            ["source.sha256", "string", "File hash for traceability/version matching"],
            ["source.total_pages", "int", "Total page count from source metadata"],
            ["cost.pricing_model", "string", "Pricing model name used for cost estimation"],
            ["cost.calls", "int", "How many LLM calls were made"],
            ["cost.total_tokens", "int", "Total tokens consumed in this run"],
            ["cost.estimated_cost_usd", "float", "Estimated LLM cost for this run"],
            ["pipeline.mode", "string", "TOC processing path used by the pipeline"],
            ["pipeline.document_type", "string", "Which indexing flow was used"],
            ["pipeline.requested_mode", "string", "Mode you asked for (`llm` or `no-llm`)"],
            ["pipeline.effective_mode", "string", "Mode actually used after checks"],
            ["pipeline.table_of_contents_pages", "array[int]", "Detected TOC pages (can be empty)"],
            ["pipeline.table_of_contents_entries", "array", "Detected/generated TOC rows used to build structure"],
            ["pipeline.verify_accuracy", "float", "TOC verification confidence/accuracy score"],
            ["pipeline.summary_enabled", "bool", "Whether summaries were generated"],
            ["structure", "array[node]", "Main nodes you query in retrieval/QA"],
            ["structure[].node_id", "string", "Unique node identifier"],
            ["structure[].title", "string", "Node heading/title"],
            ["structure[].level", "int", "Depth in hierarchy (0 = top)"],
            ["structure[].start_index / end_index", "int", "Page span for the node"],
            ["structure[].exclusive_text", "string", "Only this node’s own text"],
            ["structure[].full_text", "string", "This node + descendants (inclusive text)"],
            ["structure[].children", "array[node]", "Sub-sections under this node"],
            ["structure[].summary", "string", "Short summary of node content"]
          ]
        }
      },
      {
        title: "Also see validation output (sample)",
        body:
          "This is a simplified `validation_report.json` sample so you know how to quickly judge output quality.",
        language: "json",
        code: `{
  "generated_at": "2026-03-02T11:12:15.000000+00:00",
  "pipeline_version": "v1",
  "metrics": {
    "node_count": 161,
    "heading_anchor_match_rate": 0.94,
    "overlap_violations": 0,
    "duplicated_block_rate": 0.0,
    "preface_included": true,
    "preface_pages": 4,
    "nodes_split": 2,
    "parts_created": 5,
    "summary_coverage": 1.0,
    "empty_node_rate": 0.03
  }
}`,
        table: {
          headers: ["Key path", "Type", "Meaning (simple)"],
          rows: [
            ["generated_at", "string (ISO datetime)", "When the validation report was created"],
            ["pipeline_version", "string", "Validation/schema version for compatibility"],
            ["metrics", "object", "All quality metrics for this run"],
            ["metrics.node_count", "int", "Total number of nodes in output tree"],
            ["metrics.heading_anchor_match_rate", "float (0..1)", "How well headings were anchored to source text"],
            ["metrics.overlap_violations", "int", "Count of invalid overlapping spans (target is 0)"],
            ["metrics.duplicated_block_rate", "float (0..1)", "How much duplicated block ownership exists (target near 0)"],
            ["metrics.preface_included", "bool", "Whether preface/front matter was included"],
            ["metrics.preface_pages", "int", "How many pages were treated as preface/front matter"],
            ["metrics.nodes_split", "int", "How many oversized nodes were split"],
            ["metrics.parts_created", "int", "How many split part nodes were created"],
            ["metrics.summary_coverage", "float (0..1)", "Fraction of nodes that have summary text"],
            ["metrics.empty_node_rate", "float (0..1)", "Fraction of nodes with empty/near-empty text"]
          ]
        }
      },
      {
        title: "Save function signature (reference)",
        body: "This is the full function signature. Most users keep `save_mode` at the default.",
        language: "text",
        code: `save_document_tree(index_result, out_dir=None, save_mode="explicit", write_tree=True, write_validation=False, write_compat=False)`
      },
      {
        title: "Understand save flags (reference)",
        body: "You must enable at least one write flag. Keep compat output off unless you need it.",
        table: {
          headers: ["Flag", "What it writes", "Typical use"],
          rows: [
            ["write_tree", "tree_navexa.json (canonical)", "Always"],
            ["write_validation", "validation_report.json", "Development + QA"],
            ["write_compat", "tree_legacy_compat.json", "Only for legacy consumers"]
          ]
        }
      },
      {
        title: "Fetch tree and reports",
        body: "You can load from an output directory, a JSON file path, or an in-memory object.",
        language: "python",
        code: `from navexa import fetch_document_tree, fetch_validation_report, fetch_compat_tree

tree = fetch_document_tree("/absolute/path/out")
validation = fetch_validation_report("/absolute/path/out")
compat = fetch_compat_tree("/absolute/path/out")  # optional`
      },
      {
        title: "Supported fetch sources (quick guide)",
        body: "These are all valid inputs for `fetch_document_tree(...)`.",
        language: "text",
        code: `source can be:
- in-memory dict (tree JSON)
- JSON file path
- output directory path
- IndexResult object`
      }
    ],
    whyThisMatters: [
      "Saving less data keeps your storage and versioning cleaner.",
      "Reloading from canonical files prevents accidental schema drift."
    ],
    commonMistakes: [
      {
        mistake: "Assuming compat output is always required",
        fix: "Enable compatibility only for legacy consumers."
      }
    ],
    tryIt: [
      "Save with and without `write_compat`.",
      "Inspect directory contents and compare file size + fields."
    ],
    nextSteps: [
      {
        title: "Reasoning retrieval workflow",
        body: "Use saved trees to select nodes and generate grounded answers.",
        to: "/docs/reasoning"
      }
    ]
  }),
  withCoreToc({
    id: "reasoning",
    category: "Core concepts",
    title: "Reasoning Retrieval Workflow",
    description:
      "Use this as the main entry page. Then open each subsection in the left sidebar to learn every function with arguments, outputs, and examples.",
    whatYouBuild: [
      "A complete tree-based QA flow that is grounded in node-level context.",
      "A clear understanding of every reasoning function and its parameters."
    ],
    prerequisites: [
      "A loaded `tree_navexa` object",
      "LLM key for tree reasoning and answer generation"
    ],
    steps: [
      {
        title: "Open the reasoning subsections (left sidebar)",
        body:
          "This page is the overview. Use the subsection pages under this item to learn each function in detail.",
        table: {
          headers: ["Subsection", "What you learn", "Main functions"],
          rows: [
            ["Build tree view and node index", "Prepare tree input for reasoning", "build_search_tree_view, build_node_index"],
            ["Select nodes with LLM", "How node selection works", "reason_over_tree, print_reasoning_trace"],
            ["Extract context and answer", "Context strategy + grounded answer", "extract_selected_context, answer_from_context"],
            ["One-call helper", "Run full flow in one function", "run_reasoning_rag"],
            ["Custom prompt define", "Override built-in prompt templates safely", "prompt_template, tree_prompt_template, answer_prompt_template"],
            ["Custom LLM define", "Plug your own external adapter", "llm_callable, BaseExternalLLM"]
          ]
        }
      },
      {
        title: "Quick one-call example",
        body: "Use this first, then open subsection pages for deeper control.",
        language: "python",
        code: `from navexa import run_reasoning_rag, print_reasoning_trace

rag = run_reasoning_rag(
    query="What are the key warnings?",
    tree_or_source="/absolute/path/out",
    model=None,
    return_prompt=True,
    verbosity="medium",
)

print_reasoning_trace(rag.reasoning, rag.node_index)
print("\\nAnswer:\\n", rag.answer.answer)`
      },
      {
        title: "Terminal output example",
        body:
          "In notebooks, `[NAVEXA]` lines are runtime logs (usually tinted). Plain lines are your actual values/returns.",
        language: "text",
        code: `[NAVEXA][INFO] [step] build search tree view
[NAVEXA][INFO] [step] llm tree reasoning
[NAVEXA][DEBUG] [llm_search] model=gpt-4.1-mini
[NAVEXA][INFO] [step] extract context from selected nodes
[NAVEXA][INFO] [step] generate grounded answer
[NAVEXA][DEBUG] [answer] usage_delta={'calls': 1, 'input_tokens': 10539, 'output_tokens': 951, 'total_tokens': 11490, 'estimated_cost_usd': 0.028686}

reason_over_tree: ok
node_list: ['0055', '0056', '0057']
extract_selected_context: ok
context chars: 39627
answer_from_context: ok
answer:
... grounded answer text ...`
      }
    ],
    whyThisMatters: [
      "You keep retrieval explainable: selected nodes are visible and auditable.",
      "You can scale from simple one-call usage to fully custom prompt/provider control."
    ],
    commonMistakes: [
      {
        mistake: "Trying to learn all functions from one long page",
        fix: "Use the subsection pages; each page focuses on one part of the flow."
      }
    ],
    tryIt: [
      "Start with subsection 1 and continue in order to subsection 5.",
      "Run one query after each subsection to see what changed."
    ],
    nextSteps: [
      {
        title: "1) Build tree view and node index",
        body: "Prepare stable search input before LLM selection.",
        to: "/docs/reasoning-tree-view-index"
      },
      {
        title: "CLI commands",
        body: "Move your workflow from notebook experiments to repeatable CLI runs.",
        to: "/docs/cli"
      }
    ]
  }),
  withCoreToc({
    id: "reasoning-tree-view-index",
    navParentId: "reasoning",
    category: "Core concepts",
    title: "Build tree view and node index",
    description: "This subsection prepares your tree for reasoning and node lookup.",
    whatYouBuild: [
      "A stripped tree view for safe prompting.",
      "A fast node_id -> node metadata map for display and lookup."
    ],
    prerequisites: ["A loaded tree object from `fetch_document_tree(...)`"],
    steps: [
      {
        title: "Function: build_search_tree_view",
        body:
          "Use this for EDA/inspection. It keeps the same tree shape as saved output, but removes fields you specify so you can inspect structure cleanly.",
        language: "python",
        code: `from navexa import build_search_tree_view

tree_view = build_search_tree_view(
    tree,
    strip_fields=("exclusive_text", "full_text"),
)
print("build_search_tree_view: ok")
print("tree_view keys:", list(tree_view.keys()))
print()`,
        table: {
          headers: ["Variable", "Type", "Description"],
          rows: [
            ["tree", "dict", "Navexa tree document containing `structure`"],
            ["strip_fields", "Sequence[str]", "Any keys you want removed while keeping the original hierarchy (example: exclusive_text/full_text)"]
          ]
        }
      },
      {
        title: "Output: build_search_tree_view (inspection view)",
        body:
          "You still get a full tree document (`doc_id`, `pipeline`, `structure`, etc.). Only requested fields are removed. You can print the whole JSON to inspect hierarchy.",
        language: "text",
        code: `build_search_tree_view: ok
tree_view keys: ['doc_id', 'doc_name', 'pages', 'pipeline_version', 'source', 'cost', 'pipeline', 'structure']`
      },
      {
        title: "Function: build_node_index (light payload for LLM)",
        body:
          "Use this to create a compact node map. With `exclude_fields`, you can remove heavy metadata/text and send a clean node list + summaries to LLM.",
        language: "python",
        code: `from navexa import build_node_index

node_index_light = build_node_index(
    tree,
    include_page_ranges=True,
    exclude_fields={
        "exclusive_text",
        "full_text",
        "start_index",
        "end_index",
    },
)`,
        table: {
          headers: ["Variable", "Type", "Description"],
          rows: [
            ["tree", "dict", "Navexa tree document"],
            ["include_page_ranges", "bool", "Adds readable `page_index` like `39-40`"],
            ["exclude_fields", "Sequence[str] | None", "Drops selected keys from each mapped node (best for smaller LLM payloads)"]
          ]
        }
      },
      {
        title: "Output: build_node_index (light node map)",
        body:
          "This output is ideal for reasoning prompts: concise node metadata + summary without long body text.",
        language: "text",
        code: `build_node_index: ok
node_index_light keys(sample): ['0001', '0002', '0003']
node_index_light['0001']:
{
  'node_id': '0001',
  'title': 'PREFACE / FRONT MATTER',
  'summary': 'The ARIA Guide Low-Grade Glioma Adapted Management Guideline ...',
  'level': 0,
  'page_index': '1-4',
  'parent_id': None,
  'children': []
}`
      }
    ],
    whyThisMatters: [
      "A clean prompt tree reduces model confusion and token usage.",
      "Node index makes downstream display and debugging simple."
    ],
    commonMistakes: [
      {
        mistake: "Passing huge raw text fields in tree prompt",
        fix: "Use `strip_fields` to remove `exclusive_text` and `full_text` before reasoning."
      }
    ],
    tryIt: [
      "Print first 3 keys of `node_index` and inspect one row.",
      "Change `strip_fields` and compare prompt size."
    ],
    nextSteps: [
      {
        title: "Select nodes with LLM",
        body: "Run reasoning to get `thinking` and `node_list`.",
        to: "/docs/reasoning-select-nodes"
      }
    ]
  }),
  withCoreToc({
    id: "reasoning-select-nodes",
    navParentId: "reasoning",
    category: "Core concepts",
    title: "Select nodes with LLM",
    description: "This subsection covers node selection and trace printing.",
    whatYouBuild: [
      "An LLM selection step that returns reasoning + candidate nodes.",
      "A readable trace for human verification."
    ],
    prerequisites: ["tree object", "LLM credentials", "optional node_index for printing"],
    steps: [
      {
        title: "Function: reason_over_tree",
        body:
          "Run reasoning with a light node map (or the full tree document), then use `print_reasoning_trace(...)` for readable output.",
        language: "python",
        code: `from navexa import reason_over_tree
from navexa import print_reasoning_trace, build_node_index

node_index_light = build_node_index(
    tree,
    include_page_ranges=True,
    exclude_fields={
        "exclusive_text",
        "full_text",
        "start_index",
        "end_index",
    },
)

reasoning = reason_over_tree(
    query="What are key launch risks?",
    tree=node_index_light,
    model=None,
    prompt_template=None,
    llm_callable=None,
    return_prompt=True,
    verbosity="high",
    strip_fields=("exclusive_text", "full_text"),
    prompt_extra=None,
)

print_reasoning_trace(reasoning, node_index_light)`,
        table: {
          headers: ["Variable", "Type", "Description"],
          rows: [
            ["query", "str", "User question for retrieval"],
            ["tree", "dict", "Input for selection (tree or light node map, based on your workflow)"],
            ["model", "str | None", "Model/deployment override"],
            ["prompt_template", "str | callable | None", "Custom tree-search prompt template"],
            ["llm_callable", "BaseExternalLLM | None", "External adapter override (optional)"],
            ["return_prompt", "bool", "Include used prompt in output"],
            ["verbosity", "str | None", "low/medium/high"],
            ["strip_fields", "Sequence[str]", "Fields removed before tree prompt"],
            ["prompt_extra", "dict | None", "Extra template payload"]
          ]
        }
      },
      {
        title: "Function: print_reasoning_trace",
        body: "Print model thinking and selected nodes with titles/pages.",
        language: "python",
        code: `from navexa import print_reasoning_trace, build_node_index

node_index = build_node_index(tree, include_page_ranges=True)
print_reasoning_trace(reasoning, node_index)`,
        table: {
          headers: ["Variable", "Type", "Description"],
          rows: [
            ["reasoning_result", "TreeReasoningResult | dict", "Result from reason_over_tree"],
            ["node_index", "dict", "node_id mapped metadata for readable output"]
          ]
        }
      },
      {
        title: "Notebook output example",
        body:
          "The first block is Navexa logs, then your printed values (`thinking`, `node_list`, and prompt length).",
        language: "text",
        code: `[NAVEXA][INFO] [step] build search tree view
[NAVEXA][INFO] [step] llm tree reasoning
[NAVEXA][DEBUG] [llm_search] model=gpt-4.1-mini
[NAVEXA][DEBUG] [llm_search] usage_delta={'calls': 1, 'input_tokens': 105109, 'output_tokens': 323, 'total_tokens': 105432, 'estimated_cost_usd': 0.212802}

reason_over_tree: ok
thinking: The question focuses on extracting detailed guideline information ...
node_list: ['0055', '0056', '0057', '0077', '0091', '0148', '0149', '0150', '0151', '0152', '0153', '0154']
raw_response: {"thinking":"...","node_list":["0055","0056", "..."]}
used_prompt chars: 446720`
      }
    ],
    whyThisMatters: [
      "Node selection quality directly controls answer quality.",
      "Trace output helps you debug retrieval decisions quickly."
    ],
    commonMistakes: [
      {
        mistake: "Passing `node_index` to `reason_over_tree`",
        fix: "Pass `tree` to reasoning; use `node_index` only for printing/lookup."
      }
    ],
    tryIt: [
      "Ask one narrow and one broad query; compare node_list sizes.",
      "Enable `return_prompt=True` and inspect prompt payload."
    ],
    nextSteps: [
      {
        title: "Extract context and generate answer",
        body: "Convert selected nodes into grounded answer context.",
        to: "/docs/reasoning-context-answer"
      }
    ]
  }),
  withCoreToc({
    id: "reasoning-context-answer",
    navParentId: "reasoning",
    category: "Core concepts",
    title: "Extract context and generate answer",
    description: "This subsection explains context extraction and grounded answer generation.",
    whatYouBuild: [
      "A context bundle from selected nodes.",
      "A final answer constrained to selected context."
    ],
    prerequisites: ["tree object", "reasoning.node_list", "LLM credentials for answer stage"],
    steps: [
      {
        title: "Function: extract_selected_context",
        body: "Control how much text to include from selected nodes.",
        language: "python",
        code: `from navexa import extract_selected_context

context = extract_selected_context(
    tree=tree,
    node_list=reasoning.node_list,
    text_mode="inclusive",
    dedupe_ancestor=True,
)`,
        table: {
          headers: ["Variable", "Type", "Description"],
          rows: [
            ["tree", "dict", "Navexa tree document"],
            ["node_list", "Sequence[str]", "Selected node ids"],
            ["text_mode", "str", "`inclusive` uses full_text, `exclusive` uses exclusive_text"],
            ["dedupe_ancestor", "bool", "Drop child nodes when parent also selected"]
          ]
        }
      },
      {
        title: "Output: extract_selected_context",
        body: "Notebook-style output for context extraction.",
        language: "text",
        code: `extract_selected_context: ok
selected: ['0055', '0056', '0057', '0077', '0091', '0148', '0149', '0150', '0151', '0152', '0153', '0154']
dropped: []
missing: []
context chars: 39627
context preview:
Table 9. Stratum B: Patients with Relapsed or Progressive LGG with Symptoms ...`
      },
      {
        title: "Function: answer_from_context",
        body: "Generate final answer using only extracted context.",
        language: "python",
        code: `from navexa import answer_from_context

answer = answer_from_context(
    query="What are key launch risks?",
    context_text=context.text,
    model=None,
    prompt_template=None,
    llm_callable=None,
    return_prompt=True,
    verbosity="medium",
    prompt_extra=None,
)

print(answer.answer)`,
        table: {
          headers: ["Variable", "Type", "Description"],
          rows: [
            ["query", "str", "User question"],
            ["context_text", "str", "Retrieved context text"],
            ["model", "str | None", "Model/deployment override"],
            ["prompt_template", "str | callable | None", "Custom answer prompt template"],
            ["llm_callable", "BaseExternalLLM | None", "External adapter override (optional)"],
            ["return_prompt", "bool", "Include used prompt in result"],
            ["verbosity", "str | None", "low/medium/high"],
            ["prompt_extra", "dict | None", "Extra template payload"]
          ]
        }
      },
      {
        title: "Output: answer_from_context",
        body: "Notebook-style logs and returned answer.",
        language: "text",
        code: `[NAVEXA][INFO] [step] generate grounded answer
[NAVEXA][DEBUG] [answer] model=gpt-4.1-mini
[NAVEXA][DEBUG] [answer] prompt_preview=Answer the question based only on the context...
[NAVEXA][DEBUG] [answer] usage_delta={'calls': 1, 'input_tokens': 10539, 'cached_input_tokens': 0, 'output_tokens': 951, 'total_tokens': 11490, 'estimated_cost_usd': 0.028686}

answer_from_context: ok
answer:
Guidelines: ARIA Guide Low-Grade Glioma Adapted Management Guideline: Version 1.4
...
used_prompt chars: 446720`
      }
    ],
    whyThisMatters: [
      "You control context size and hierarchy behavior explicitly.",
      "Grounded context reduces hallucination risk."
    ],
    commonMistakes: [
      {
        mistake: "Using `exclusive` for broad policy questions",
        fix: "Use `inclusive` when parent + child context is needed."
      }
    ],
    tryIt: [
      "Run with `inclusive` and `exclusive`; compare answer completeness.",
      "Toggle `dedupe_ancestor` and compare context length."
    ],
    nextSteps: [
      {
        title: " One-call helper",
        body: "Run complete reasoning in one function.",
        to: "/docs/reasoning-end-to-end"
      }
    ]
  }),
  withCoreToc({
    id: "reasoning-end-to-end",
    navParentId: "reasoning",
    category: "Core concepts",
    title: "One-call helper: run_reasoning_rag",
    description: "This subsection shows the fastest full workflow with all major knobs.",
    whatYouBuild: [
      "One-call reasoning + answer execution.",
      "A full result object with tree, context, answer, and cost delta."
    ],
    prerequisites: ["Tree source (dict, file, or output dir)", "LLM setup"],
    steps: [
      {
        title: "Function: run_reasoning_rag",
        body: "Single call for tree reasoning + context extraction + answer generation.",
        language: "python",
        code: `from navexa import run_reasoning_rag, print_reasoning_trace

rag = run_reasoning_rag(
    query="What are the key warnings?",
    tree_or_source="/absolute/path/out",
    model=None,
    tree_prompt_template=None,
    answer_prompt_template=None,
    llm_callable=None,
    return_prompt=True,
    verbosity="high",
    strip_fields=("exclusive_text", "full_text"),
    text_mode="inclusive",
    dedupe_ancestor=True,
    tree_prompt_extra=None,
    answer_prompt_extra=None,
)

print_reasoning_trace(rag.reasoning, rag.node_index)
print(rag.answer.answer)
print(rag.cost_delta)`,
        table: {
          headers: ["Variable", "Type", "Description"],
          rows: [
            ["query", "str", "User question"],
            ["tree_or_source", "Any", "Tree dict, JSON path, or output directory"],
            ["model", "str | None", "Model/deployment override"],
            ["tree_prompt_template", "str | callable | None", "Custom tree-search prompt template"],
            ["answer_prompt_template", "str | callable | None", "Custom answer prompt template"],
            ["llm_callable", "BaseExternalLLM | None", "External adapter override (optional)"],
            ["return_prompt", "bool", "Include prompt text in outputs"],
            ["verbosity", "str | None", "low/medium/high"],
            ["strip_fields", "Sequence[str]", "Fields removed in tree prompt view"],
            ["text_mode", "str", "inclusive | exclusive"],
            ["dedupe_ancestor", "bool", "Drop descendant nodes when ancestor selected"],
            ["tree_prompt_extra", "dict | None", "Extra payload for tree prompt"],
            ["answer_prompt_extra", "dict | None", "Extra payload for answer prompt"]
          ]
        }
      },
      {
        title: "Output object fields",
        body: "Main fields inside returned `RAGResult`.",
        table: {
          headers: ["Field", "Meaning"],
          rows: [
            ["tree", "Loaded normalized tree object"],
            ["tree_view", "Prompt-stripped tree view"],
            ["node_index", "node_id -> metadata map"],
            ["reasoning", "Thinking + node_list result"],
            ["context", "Extracted context bundle"],
            ["answer", "Final grounded answer object"],
            ["cost_before / cost_after / cost_delta", "Usage tracking around this run"]
          ]
        }
      },
      {
        title: "Terminal output example",
        body:
          "One-call output has the same pattern: first runtime logs, then readable values from `print_reasoning_trace(...)` and `rag.answer.answer`.",
        language: "text",
        code: `[NAVEXA][INFO] [step] build search tree view
[NAVEXA][INFO] [step] llm tree reasoning
[NAVEXA][INFO] [step] extract context from selected nodes
[NAVEXA][INFO] [step] generate grounded answer
[NAVEXA][INFO] [result] retrieved_nodes=12 context_chars=39627
[NAVEXA][INFO] [result] answer_generated=yes

Reasoning Process:
The question focuses on treatment sections for relapsed/progressive disease...

Retrieved Nodes:
Node ID: 0055   Page: 39-40   Title: Stratum B ...
Node ID: 0056   Page: 40-41   Title: Stratum C ...
...

Answer:
... grounded answer text ...

Cost delta:
{'calls': 2, 'input_tokens': 115648, 'cached_input_tokens': 0, 'output_tokens': 1274, 'total_tokens': 116922, 'estimated_cost_usd': 0.241488}`
      }
    ],
    whyThisMatters: [
      "Great default for production endpoints and notebooks.",
      "You still keep control over context policy and prompts."
    ],
    commonMistakes: [
      {
        mistake: "Passing an invalid source path to tree_or_source",
        fix: "Use a tree dict, exact JSON file path, or output directory path."
      }
    ],
    tryIt: [
      "Run once with `text_mode=inclusive`, once with `exclusive`.",
      "Inspect `cost_delta` and answer length."
    ],
    nextSteps: [
      {
        title: "Custom prompt define",
        body: "Create your own prompt templates for tree selection and answer generation.",
        to: "/docs/reasoning-custom-prompt"
      },
      {
        title: "Custom LLM define",
        body: "Plug your own external LLM adapter (BaseExternalLLM).",
        to: "/docs/reasoning-custom-llm"
      }
    ]
  }),
  withCoreToc({
    id: "reasoning-custom-prompt",
    navParentId: "reasoning",
    category: "Core concepts",
    title: "Custom prompt define",
    description:
      "Use your own prompt templates for tree selection and answer generation, while keeping Navexa workflow and output format.",
    whatYouBuild: [
      "Custom tree-selection prompt behavior.",
      "Custom answer style/policy using your own prompt text."
    ],
    prerequisites: ["Reasoning flow working with default prompts"],
    steps: [
      {
        title: "Custom prompt in reason_over_tree",
        body:
          "Use `prompt_template` to override the tree-selection prompt. Use `prompt_extra` to pass policy/config JSON.",
        language: "python",
        code: `from navexa import reason_over_tree

custom_tree_prompt = """
You are a strict node selector.
Question: {query}
Tree: {tree_json}
Constraints: {extra_json}
Return JSON:
{"thinking":"...", "node_list":["0001"]}
"""

reasoning = reason_over_tree(
    query="What are key warnings?",
    tree=tree,
    model="gpt-4.1-mini",
    prompt_template=custom_tree_prompt,
    prompt_extra={"max_nodes": 3, "must_include_terms": ["warning", "precaution"]},
    return_prompt=True,
)`,
        table: {
          headers: ["Variable", "Type", "Description"],
          rows: [
            ["prompt_template", "str | callable | None", "Custom tree-search template"],
            ["prompt_extra", "dict | None", "Extra JSON payload injected into template"],
            ["return_prompt", "bool", "Return the exact prompt used (`used_prompt`)"]
          ]
        }
      },
      {
        title: "Custom prompt in answer_from_context",
        body:
          "Use `prompt_template` to enforce answer style and safety rules. Use `prompt_extra` for dynamic controls.",
        language: "python",
        code: `from navexa import answer_from_context

answer_template = """
Answer only from context.
Question: {query}
Context: {context}
Policy: {extra_json}
"""

answer = answer_from_context(
    query="What are key warnings?",
    context_text=context.text,
    model="gpt-4.1-mini",
    prompt_template=answer_template,
    prompt_extra={"style": "bullet", "max_points": 5},
    return_prompt=True,
)
print(answer.answer)`,
        table: {
          headers: ["Variable", "Type", "Description"],
          rows: [
            ["prompt_template", "str | callable | None", "Custom answer template"],
            ["prompt_extra", "dict | None", "Extra answer policy payload"],
            ["return_prompt", "bool", "Return final rendered answer prompt"]
          ]
        }
      },
      {
        title: "Custom prompts in one-call run_reasoning_rag",
        body:
          "Set separate templates for tree and answer stages in one call.",
        language: "python",
        code: `from navexa import run_reasoning_rag

rag = run_reasoning_rag(
    query="What are key warnings?",
    tree_or_source=tree,
    tree_prompt_template=custom_tree_prompt,
    answer_prompt_template=answer_template,
    tree_prompt_extra={"max_nodes": 3},
    answer_prompt_extra={"style": "short"},
    return_prompt=True,
)
print(rag.reasoning.used_prompt)
print(rag.answer.used_prompt)`
      }
    ],
    whyThisMatters: [
      "Prompt customization helps align outputs to your domain and review policy.",
      "You can tune behavior without changing Navexa internals."
    ],
    commonMistakes: [
      {
        mistake: "Forgetting required placeholders",
        fix: "Include `{query}` + `{tree_json}` in tree prompt and `{query}` + `{context}` in answer prompt."
      }
    ],
    tryIt: [
      "Run once with default prompts, then with your custom templates.",
      "Compare `used_prompt` and node selection quality."
    ],
    nextSteps: [
      {
        title: "Custom LLM define",
        body: "Now plug your own external adapter with `llm_callable`.",
        to: "/docs/reasoning-custom-llm"
      }
    ]
  }),
  withCoreToc({
    id: "reasoning-custom-llm",
    navParentId: "reasoning",
    category: "Core concepts",
    title: "Custom LLM define",
    description:
      "Use your own model/provider by passing `llm_callable` as a `BaseExternalLLM` adapter (adapter-only).",
    whatYouBuild: [
      "A provider-agnostic reasoning + answer workflow using your own backend.",
      "A predictable interface for both `tree_search` and `answer_generation` stages."
    ],
    prerequisites: ["Custom provider endpoint or SDK", "Basic reasoning flow already tested"],
    steps: [
      {
        title: "Internal vs external LLM",
        body:
          "Navexa reasoning APIs (`reason_over_tree`, `answer_from_context`, `run_reasoning_rag`) support two paths: internal provider client or an external adapter.",
        bullets: [
          "Internal LLM client: used when `llm_callable` is not provided.",
          "External adapter: used when you pass `llm_callable=...`.",
          "`llm_callable` must be an instance of `BaseExternalLLM` (adapter-only)."
        ]
      },
      {
        title: "Required interface",
        body:
          "Use `BaseExternalLLM` and implement `invoke(prompt=..., model=..., stage=...)`.",
        bullets: [
          "Stage values passed by Navexa: `tree_search` and `answer_generation`.",
          "Allowed return types from `invoke(...)`: `str`, `dict`, or `list`.",
          "For `tree_search`, return JSON with `thinking` and `node_list`."
        ],
        language: "json",
        code: `{
  "thinking": "short reasoning",
  "node_list": ["0001", "0003"]
}`
      },
      {
        title: "Stage values (what Navexa passes)",
        body: "Navexa passes a `stage` string so your adapter can route behavior.",
        language: "json",
        code: `{
  "tree_search": "Choose node IDs relevant to query",
  "answer_generation": "Generate final grounded answer"
}`
      },
      {
        title: "Allowed return types",
        body:
          "Your adapter can return `str`, `dict`, or `list`. Navexa normalizes to a string (dict/list are serialized to JSON).",
        language: "json",
        code: `{
  "allowed_return_types": ["str", "dict", "list"],
  "tree_search_recommended_shape": {
    "thinking": "short reasoning",
    "node_list": ["0001", "0003"]
  }
}`
      },
      {
        title: "Azure adapter example",
        body:
          "Azure OpenAI often requires using your deployment name as `model`. This adapter also parses JSON for `tree_search` reliably.",
        language: "python",
        code: `import os
import json
import re
from openai import OpenAI
from navexa import BaseExternalLLM

class AzureOpenAILLM(BaseExternalLLM):
    def __init__(self, *, deployment_name=None, api_key=None, base_url=None, timeout=60.0):
        super().__init__(
            provider="azure",
            default_model=deployment_name or os.getenv("AZURE_DEPLOYMENT_NAME"),
        )
        api_key = api_key or os.getenv("AZURE_OPENAI_API_KEY")
        base_url = base_url or os.getenv("AZURE_OPENAI_BASE_URL")
        if not api_key or not base_url:
            raise ValueError("Set AZURE_OPENAI_API_KEY and AZURE_OPENAI_BASE_URL.")
        if "openai.azure.com" in base_url and "/openai/" not in base_url:
            base_url = base_url.rstrip("/") + "/openai/v1"
        self.client = OpenAI(api_key=api_key, base_url=base_url, timeout=timeout)

    def invoke(self, *, prompt: str, model: str, stage: str):
        resp = self.client.chat.completions.create(
            model=model,  # Azure deployment name
            temperature=0,
            messages=[{"role": "user", "content": prompt}],
        )
        text = (resp.choices[0].message.content or "").strip()
        if stage == "tree_search":
            try:
                return json.loads(text)
            except Exception:
                m = re.search(r"\\{[\\s\\S]*\\}", text)
                if m:
                    try:
                        return json.loads(m.group(0))
                    except Exception:
                        pass
                return {"thinking": "", "node_list": []}
        return text`,
        bullets: [
          "Required env: `AZURE_OPENAI_API_KEY`",
          "Required env: `AZURE_OPENAI_BASE_URL` (example: `https://<resource>.openai.azure.com/openai/v1`)",
          "Required env: `AZURE_DEPLOYMENT_NAME`"
        ]
      },
      {
        title: "One-call usage",
        body:
          "Use `run_reasoning_rag(...)` to do: tree search -> context extraction -> answer generation.",
        language: "python",
        code: `from navexa import run_reasoning_rag

llm = AzureOpenAILLM()

rag = run_reasoning_rag(
    query="What are key warnings?",
    tree_or_source=tree,
    llm_callable=llm,
    model=None,  # uses adapter default_model
)
print(rag.answer.answer)`
      },
      {
        title: "Step-by-step usage (different adapters per stage)",
        body:
          "If you want different deployment names/providers for node selection vs final answer, call stages manually.",
        language: "python",
        code: `from navexa import reason_over_tree, extract_selected_context, answer_from_context

search_llm = AzureOpenAILLM(deployment_name="search-deploy")
answer_llm = AzureOpenAILLM(deployment_name="answer-deploy")

reasoning = reason_over_tree(
    query="What are key warnings?",
    tree=tree,
    llm_callable=search_llm,
)

context = extract_selected_context(
    tree=tree,
    node_list=reasoning.node_list,
    text_mode="inclusive",
    dedupe_ancestor=True,
)

answer = answer_from_context(
    query="What are key warnings?",
    context_text=context.text,
    llm_callable=answer_llm,
)
print(answer.answer)`
      },
      {
        title: "Provider router adapter (OpenAI/Azure/Claude/Gemini)",
        body:
          "If you want one adapter that can call multiple providers, use a router and keep credentials in env vars.",
        language: "python",
        code: `import os
from navexa import BaseExternalLLM

class RouterLLM(BaseExternalLLM):
    def __init__(self, provider: str, default_model: str | None = None):
        super().__init__(provider=provider, default_model=default_model)

    def invoke(self, *, prompt: str, model: str, stage: str):
        if self.provider in {"openai", "azure"}:
            from openai import OpenAI
            kwargs = {"api_key": os.getenv("OPENAI_API_KEY")}
            if self.provider == "azure":
                kwargs = {
                    "api_key": os.getenv("AZURE_OPENAI_API_KEY"),
                    "base_url": os.getenv("AZURE_OPENAI_BASE_URL"),
                }
            client = OpenAI(**kwargs)
            resp = client.chat.completions.create(
                model=model,
                temperature=0,
                messages=[{"role": "user", "content": prompt}],
            )
            return resp.choices[0].message.content or ""

        if self.provider == "claude":
            import anthropic
            client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
            resp = client.messages.create(
                model=model,
                max_tokens=1200,
                messages=[{"role": "user", "content": prompt}],
            )
            return "".join(
                block.text for block in resp.content
                if getattr(block, "type", "") == "text"
            )

        if self.provider == "gemini":
            from google import genai
            client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
            resp = client.models.generate_content(model=model, contents=prompt)
            return getattr(resp, "text", "") or ""

        raise ValueError(f"Unsupported provider: {self.provider}")`
      },
      {
        title: "Inspect prompts while debugging external LLM",
        body:
          "Set `return_prompt=True` to inspect exactly what Navexa sent to your adapter.",
        language: "python",
        code: `from navexa import reason_over_tree, run_reasoning_rag

llm = AzureOpenAILLM()

reasoning = reason_over_tree(
    query="What are key warnings?",
    tree=tree,
    llm_callable=llm,
    return_prompt=True,
)
print(reasoning.used_prompt)

rag = run_reasoning_rag(
    query="What are key warnings?",
    tree_or_source=tree,
    llm_callable=llm,
    return_prompt=True,
)
print(rag.reasoning.used_prompt)
print(rag.answer.used_prompt)`
      },
      {
        title: "Migration note",
        body:
          "Function-style `llm_callable` is no longer supported. Use `BaseExternalLLM` for all external integrations.",
        bullets: [
          "If you pass a function, Navexa will raise a `TypeError`.",
          "Create an adapter class and implement `invoke(...)`."
        ]
      },
      {
        title: "Practical notes",
        body: "Small rules of thumb that prevent confusing failures in production.",
        bullets: [
          "If `llm_callable` is provided, Navexa uses it and does not call the internal provider client for reasoning steps.",
          "Keep `temperature=0` in your backend calls for stable node selection behavior.",
          "Never hardcode secrets in source files; use environment variables."
        ]
      }
    ],
    whyThisMatters: [
      "You can integrate Navexa with any internal or third-party LLM stack.",
      "Separation by `stage` lets you use different logic per step."
    ],
    commonMistakes: [
      {
        mistake: "Returning plain text in tree_search stage",
        fix: "Return valid JSON with `thinking` and `node_list` for tree selection."
      },
      {
        mistake: "Passing a function as llm_callable",
        fix: "Use a `BaseExternalLLM` adapter instance (adapter-only)."
      }
    ],
    tryIt: [
      "Start with the `AzureOpenAILLM` adapter or a small stub adapter that returns empty node lists.",
      "Keep `temperature=0` while validating node selection behavior."
    ],
    nextSteps: [
      {
        title: "CLI commands",
        body: "Operationalize your flow in scripts and CI.",
        to: "/docs/cli"
      }
    ]
  }),
  withCoreToc({
    id: "cli",
    category: "Reference",
    title: "CLI Commands",
    description:
      "Use `navexa-index` for repeatable indexing in scripts, cron jobs, and CI pipelines.",
    whatYouBuild: [
      "A shell-first workflow that mirrors Python API behavior.",
      "A reproducible command template for each document type."
    ],
    prerequisites: [
      "Navexa installed",
      "Absolute paths for input/output",
      "Configured env vars for llm mode"
    ],
    steps: [
      {
        title: "Basic no-LLM run (recommended smoke command)",
        body: "Use this first. It is deterministic and cheap to debug.",
        language: "bash",
        code: `navexa-index \n\
  --pdf /absolute/path/document.pdf \n\
  --out-dir /absolute/path/out \n\
  --mode no-llm \n\
  --document-type structured \n\
  --output-format markdown \n\
  --verbose medium \n\
  --with-validation`
      },
      {
        title: "Structured LLM run",
        body: "Use high verbosity while hardening your first production LLM command.",
        language: "bash",
        code: `navexa-index \n\
  --pdf /absolute/path/document.pdf \n\
  --out-dir /absolute/path/out \n\
  --mode llm \n\
  --document-type structured \n\
  --parser-model docling \n\
  --output-format markdown \n\
  --verbose high \n\
  --if-add-node-summary yes \n\
  --with-validation`
      },
      {
        title: "Transcript run",
        body:
          "Transcript CLI run (LLM-required). `--output-format` is accepted for API consistency but does not currently change transcript parsing.",
        language: "bash",
        code: `navexa-index \n\
  --pdf /absolute/path/transcript.pdf \n\
  --out-dir /absolute/path/transcript_out \n\
  --mode llm \n\
  --document-type transcript \n\
  --verbose medium`
      },
      {
        title: "If navexa-index is command not found",
        body:
          "If you installed with `pip install --user`, add your user scripts folder to PATH once (macOS, Linux, or Windows).",
        language: "bash",
        code: `# macOS (zsh)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
which navexa-index
navexa-index --help

# Linux (bash)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
which navexa-index
navexa-index --help

# Windows PowerShell
$UserBase = python -m site --user-base
$ScriptsPath = "$UserBase\\Scripts"
[Environment]::SetEnvironmentVariable("Path", "$env:Path;$ScriptsPath", "User")
$env:Path = "$env:Path;$ScriptsPath"
where navexa-index
navexa-index --help

# Windows CMD
for /f "delims=" %i in ('python -m site --user-base') do set "USERBASE=%i"
set "PATH=%PATH%;%USERBASE%\\Scripts"
where navexa-index
navexa-index --help`
      },
      {
        title: "All CLI flags (reference)",
        body: "These flags map to the same parameters you can pass in Python APIs.",
        table: {
          headers: ["Flag", "Allowed values", "Default"],
          rows: [
            ["--pdf", "PDF path", "required"],
            ["--out-dir", "output dir", "required"],
            ["--model", "model/deployment string", "None"],
            ["--mode", "llm | no-llm (no-llm for structured flow)", "NAVEXA_MODE or no-llm"],
            ["--document-type", "structured | semi_structured | unstructured | transcript", "structured"],
            ["--parser-model", "docling", "docling"],
            ["--output-format", "markdown | text", "markdown"],
            ["--verbose", "low/medium/high or 1/2/3", "medium"],
            ["--max-token-num-each-node", "int", "12000"],
            ["--max-page-num-each-node", "int", "8"],
            ["--if-add-node-summary", "yes | no", "yes"],
            ["--with-validation", "switch", "off"],
            ["--with-compat", "switch", "off"]
          ]
        }
      }
    ],
    whyThisMatters: [
      "CLI runs are easy to automate and monitor.",
      "Absolute paths reduce deployment-time surprises."
    ],
    commonMistakes: [
      {
        mistake: "Running CLI without activated environment",
        fix: "Activate your environment before calling `navexa-index`."
      }
    ],
    tryIt: [
      "Run a command with `--with-validation` and inspect the report.",
      "Repeat in `no-llm` and compare cost fields."
    ],
    nextSteps: [
      {
        title: "Output schema",
        body: "Understand exactly what fields your downstream systems can rely on.",
        to: "/docs/output-schema"
      }
    ]
  }),
  withCoreToc({
    id: "api-reference",
    category: "Reference",
    title: "Python API Reference (Top-level)",
    description:
      "A quick cheat sheet of what you can import from `navexa`, and what each function is for.",
    whatYouBuild: [
      "A clear map from task to function (index, save, load, reason, answer).",
      "A safe default: import from `navexa` instead of internal modules."
    ],
    prerequisites: [
      "Navexa installed",
      "Basic Python familiarity"
    ],
    steps: [
      {
        title: "Import from the top-level package",
        body: "Navexa exposes the main workflows at the top level.",
        language: "python",
        code: `from navexa import index_structured_document_tree, save_document_tree`
      },
      {
        title: "Indexing functions",
        body: "Use one of these to convert a PDF into a tree.",
        table: {
          headers: ["Function", "Best for", "LLM required?"],
          rows: [
            ["index_structured_document_tree", "Clear headings / TOC", "optional"],
            ["index_semi_structured_document_tree", "Messy headings / order", "required"],
            ["index_unstructured_document_tree", "Weak or missing headings", "optional"],
            ["index_transcript_document_tree", "Interviews / calls", "required"]
          ]
        }
      },
      {
        title: "Convenience wrappers",
        body: "Shortcuts for common patterns and backward compatibility.",
        table: {
          headers: ["Function", "What it does"],
          rows: [
            ["index_and_save_document_tree", "Index + save outputs in one call"],
            ["index_document_tree", "Backward-compatible wrapper (routes to structured flow)"]
          ]
        }
      },
      {
        title: "Save and fetch functions",
        body: "Use these to persist and reload the tree.",
        table: {
          headers: ["Function", "What it does"],
          rows: [
            ["save_document_tree", "Write JSON outputs to a folder"],
            ["fetch_document_tree", "Load tree_navexa.json from dict/path/dir"],
            ["fetch_validation_report", "Load validation_report.json (if present)"],
            ["fetch_compat_tree", "Load legacy compat tree (if present)"]
          ]
        }
      },
      {
        title: "Reasoning and RAG functions",
        body: "Use these to select nodes and answer questions from the selected context.",
        table: {
          headers: ["Function", "What it does"],
          rows: [
            ["build_search_tree_view", "Remove heavy text fields for prompting"],
            ["build_node_index", "Build a node_id → node info mapping"],
            ["reason_over_tree", "LLM selects relevant node ids"],
            ["print_reasoning_trace", "Print reasoning + retrieved nodes"],
            ["extract_selected_context", "Combine selected node text into context"],
            ["answer_from_context", "Generate answer using only context"],
            ["run_reasoning_rag", "One-call helper: reason + context + answer"]
          ]
        }
      },
      {
        title: "Environment helper",
        body: "Loads `.env` using Navexa’s environment loading rules.",
        language: "python",
        code: `from navexa import load_navexa_env\n\nload_navexa_env()`
      }
    ],
    whyThisMatters: [
      "Top-level imports are stable and easier to use across projects.",
      "A clear map reduces wrong-function usage and avoids wasted time/cost."
    ],
    commonMistakes: [
      {
        mistake: "Importing from internal modules like navexa.pipeline.*",
        fix: "Import from `navexa` unless you are intentionally developing the library."
      }
    ],
    tryIt: [
      "Open a Python REPL and import the functions you need.",
      "Run one index and save the output.",
      "Load the tree back and run one reasoning query."
    ],
    nextSteps: [
      {
        title: "Quickstart",
        body: "Index your first PDF and inspect the generated tree.",
        to: "/docs/quickstart"
      },
      {
        title: "Reasoning retrieval workflow",
        body: "Select nodes before answering questions.",
        to: "/docs/reasoning"
      }
    ]
  }),
  withCoreToc({
    id: "output-schema",
    category: "Reference",
    title: "Output Schema (Canonical)",
    description:
      "`tree_navexa.json` is the primary output contract for indexing, retrieval, analytics, and QA.",
    whatYouBuild: [
      "A mental model of top-level and node-level schema fields.",
      "Safer downstream consumers that avoid brittle assumptions."
    ],
    prerequisites: [
      "At least one indexed document output"
    ],
    steps: [
      {
        title: "Know which files are written",
        body: "Indexing can write one or more JSON files depending on your flags.",
        table: {
          headers: ["File", "When it exists", "What it is"],
          rows: [
            ["tree_navexa.json", "always when write_tree=True", "Canonical output tree"],
            ["validation_report.json", "when write_validation=True / --with-validation", "Quality + diagnostics"],
            ["tree_legacy_compat.json", "when write_compat=True / --with-compat", "Legacy compatibility export"]
          ]
        }
      },
      {
        title: "Inspect top-level keys",
        body: "Start with `source`, `cost`, `pipeline`, and `structure`.",
        language: "json",
        code: `{
  "doc_id": "sample-doc",
  "doc_name": "sample-doc",
  "pages": {"count": 26},
  "pipeline_version": "0.1.x",
  "source": {...},
  "cost": {...},
  "pipeline": {...},
  "structure": [...],
  "transcript": {...}   // only for transcript mode
}`
      },
      {
        title: "Inspect node payload",
        body: "Use `exclusive_text` for node-only text and `full_text` for inclusive context.",
        language: "json",
        code: `{
  "node_id": "0012",
  "title": "2 DOSAGE AND ADMINISTRATION",
  "level": 1,
  "start_index": 3,
  "end_index": 4,
  "exclusive_text": "...",
  "full_text": "...",
  "children": []
}`
      },
      {
        title: "Where to look for cost and runtime settings",
        body:
          "`cost` contains calls/tokens/estimated cost. `pipeline` contains mode, parser settings, node limits, and the steps executed.",
        language: "json",
        code: `{
  "cost": {
    "calls": 12,
    "total_tokens": 12345,
    "estimated_cost_usd": 0.42
  },
  "pipeline": {
    "requested_mode": "llm",
    "effective_mode": "llm",
    "document_type": "structured",
    "parser_model": "docling",
    "output_format": "markdown"
  }
}`
      }
    ],
    whyThisMatters: [
      "Schema awareness prevents accidental breakage in retrieval pipelines.",
      "You can version checks around stable fields while letting internals evolve."
    ],
    commonMistakes: [
      {
        mistake: "Treating legacy compat file as canonical",
        fix: "Use `tree_navexa.json` as default and enable compat only for legacy clients."
      }
    ],
    tryIt: [
      "Write a small validator that checks required top-level keys.",
      "Fail your pipeline early if required fields are missing."
    ],
    nextSteps: [
      {
        title: "Troubleshooting",
        body: "Diagnose the most common runtime and environment issues quickly.",
        to: "/docs/troubleshooting"
      }
    ]
  }),
  withCoreToc({
    id: "troubleshooting",
    category: "Reference",
    title: "Troubleshooting",
    description:
      "Most failures are environment drift, parser backend conflicts, or missing credentials. This checklist gets you unstuck fast.",
    whatYouBuild: [
      "A triage checklist for local development and production-like runs.",
      "A repeatable debug flow your team can document internally."
    ],
    prerequisites: [
      "Access to terminal logs",
      "The failing command or notebook cell"
    ],
    steps: [
      {
        title: "Validate environment",
        body: "Check that Python executable and package imports match your intended environment.",
        language: "bash",
        code: `python -c "import sys, navexa; print(sys.executable); print('navexa ok')"
python -c "import docling, openai, tiktoken; print('deps ok')"`
      },
      {
        title: "Inspect mode and summary settings",
        body: "Zero cost or empty summaries usually means no LLM call path was used.",
        language: "bash",
        code: `echo $NAVEXA_MODE
echo $OPENAI_MODEL_NAME
echo $AZURE_DEPLOYMENT_NAME
echo $NAVEXA_IF_ADD_NODE_SUMMARY`
      },
      {
        title: "Know when LLM is required",
        body:
          "Transcript is strictly LLM-required. Semi-structured wrapper also enforces LLM mode. Unstructured can run with or without LLM.",
        table: {
          headers: ["Document type", "LLM required?", "What happens if key/model is missing"],
          rows: [
            ["structured", "optional", "Falls back to no-LLM when needed"],
            ["unstructured", "optional", "Runs no-LLM unless mode='llm' is forced"],
            ["semi_structured", "required (wrapper behavior)", "Raises RuntimeError in wrapper if model/key missing"],
            ["transcript", "required", "Raises RuntimeError (fail-fast)"]
          ]
        }
      },
      {
        title: "Notebook tips",
        body: "Most notebook issues are caused by mismatched kernels or missing notebook extras.",
        language: "bash",
        code: `# In Python, confirm which interpreter is running
python - <<'PY'
import sys
print(sys.executable)
PY

# Optional: if you see tqdm/IProgress warnings
python -m pip install -U "navexa[notebook]"`
      },
      {
        title: "If you see an asyncio event loop error",
        body:
          "Some notebook environments already run an event loop. If you hit an event-loop RuntimeError, restart the kernel and re-run imports.",
        language: "text",
        code: `Common error:\nRuntimeError: asyncio.run() cannot be called from a running event loop\n\nFix:\n1) Restart notebook kernel\n2) Re-run imports\n3) Re-run your index/reasoning cell`
      },
      {
        title: "If navexa-index is command not found",
        body:
          "When installed with --user, the script lives in your user scripts folder. Add it to PATH for macOS, Linux, or Windows.",
        language: "bash",
        code: `# macOS (zsh)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
which navexa-index
navexa-index --help

# Linux (bash)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
which navexa-index
navexa-index --help

# Windows PowerShell
$UserBase = python -m site --user-base
$ScriptsPath = "$UserBase\\Scripts"
[Environment]::SetEnvironmentVariable("Path", "$env:Path;$ScriptsPath", "User")
$env:Path = "$env:Path;$ScriptsPath"
where navexa-index
navexa-index --help

# Windows CMD
for /f "delims=" %i in ('python -m site --user-base') do set "USERBASE=%i"
set "PATH=%PATH%;%USERBASE%\\Scripts"
where navexa-index
navexa-index --help`
      },
      {
        title: "Acknowledgment and project scope (important)",
        body:
          "Navexa is an open-source project that takes inspiration from PageIndex’s high-level pipeline ideas, while implementing its own codebase, flow, and extensions for practical production use.",
        bullets: [
          "Acknowledgment: PageIndex influenced the general workflow pattern (outline/tree-first indexing philosophy).",
          "Independent implementation: Navexa does not copy the whole library; it implements its own modules, API surface, and runtime behavior.",
          "Navexa-specific logic: Docling-based parsing, markdown-first tree construction, manual/synthetic TOC handling, LLM-assisted correction, and canonical API-like JSON output.",
          "Customization: you can use one configured provider for all steps, or pass custom prompts and an external adapter via `llm_callable` (BaseExternalLLM) at reasoning/answer stages.",
          "Open-source intent: Navexa is fully open and extensible, so teams can adapt it to their own pipelines.",
          "Attribution principle: using an upstream idea is normal in software ecosystems (similar to how many projects build on foundational libraries), while still keeping clear credit and independent implementation."
        ],
        table: {
          headers: ["Area", "Inspiration", "Navexa implementation"],
          rows: [
            ["Pipeline philosophy", "PageIndex-style tree-first approach", "Rebuilt in Navexa with its own APIs and docs contract"],
            ["Document parsing", "General PDF indexing pattern", "Docling-driven parsing + Navexa segmentation logic"],
            ["TOC handling", "TOC detect/create/verify concept", "Navexa flow with manual/synthetic TOC + LLM correction paths"],
            ["Output format", "Node-oriented tree output concept", "Navexa canonical JSON schema + validation report + optional compat export"],
            ["LLM integration", "LLM-assisted indexing idea", "Provider-configurable pipeline + custom prompt + external adapter hooks"]
          ]
        }
      }
    ],
    whyThisMatters: [
      "Fast diagnosis shortens iteration and cuts wasted API cost.",
      "Most issues can be solved without code changes."
    ],
    commonMistakes: [
      {
        mistake: "Running notebook kernel from a different environment",
        fix: "Restart kernel after installing dependencies and verify `sys.executable`."
      },
      {
        mistake: "Interpreting warning logs as fatal",
        fix: "Confirm whether command actually failed before changing pipeline logic."
      }
    ],
    tryIt: [
      "Capture one failing run command and create an internal runbook entry.",
      "Add sanity checks before your first production job."
    ],
    nextSteps: [
      {
        title: "License and attribution",
        body: "Understand licensing and where third-party notices live.",
        to: "/docs/license"
      },
      {
        title: "Documentation architecture",
        body: "See how the docs structure maps to tutorials, how-to, and reference layers.",
        to: "/docs/architecture"
      }
    ]
  })
];

export const groupOrder = ["Get started", "Core concepts", "Reference"];

export function getSectionById(id) {
  return sections.find((section) => section.id === id) || null;
}

export function getSectionIndex(id) {
  return sections.findIndex((section) => section.id === id);
}

export function getPrevNext(id) {
  const currentIndex = getSectionIndex(id);
  if (currentIndex < 0) {
    return { previous: null, next: null };
  }
  return {
    previous: currentIndex > 0 ? sections[currentIndex - 1] : null,
    next: currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null
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

function flattenPageText(section) {
  const values = [];
  values.push(section.title, section.description, section.category);
  if (Array.isArray(section.whatYouBuild)) values.push(...section.whatYouBuild);
  if (Array.isArray(section.prerequisites)) values.push(...section.prerequisites);
  if (Array.isArray(section.whyThisMatters)) values.push(...section.whyThisMatters);
  if (Array.isArray(section.tryIt)) values.push(...section.tryIt);
  if (Array.isArray(section.steps)) {
    for (const step of section.steps) {
      values.push(step.title, step.body);
    }
  }
  if (Array.isArray(section.commonMistakes)) {
    for (const item of section.commonMistakes) {
      values.push(item.mistake, item.fix);
    }
  }
  if (Array.isArray(section.toc)) {
    for (const item of section.toc) {
      values.push(item.title);
    }
  }

  return values
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getSearchDocuments() {
  return sections.map((section) => ({
    id: section.id,
    category: section.category,
    title: section.title,
    description: section.description,
    headings: (section.toc || []).map((item) => item.title),
    text: flattenPageText(section)
  }));
}
