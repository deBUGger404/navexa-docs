import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Rocket
} from "../lib/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import BottomPager from "../components/BottomPager";
import CodeBlock from "../components/CodeBlock";
import DocTable from "../components/DocTable";
import { getFirstChildSection, getSectionById, getPrevNext } from "../content/navexaDocs";
import useBottomSentinel from "../hooks/useBottomSentinel";
import Seo from "../components/Seo";
import { buildPageMeta } from "../lib/seo";

function OverviewHero({ section }) {
  if (!section.heroCode) return null;

  return (
    <section id="hero-quickstart" className="overview-hero-card">
      <div className="overview-hero-copy">
        <h2>Developer quickstart</h2>
        <p>
          Make your first index in minutes. Learn the core workflow before moving into reasoning and production integration.
        </p>
        <Link className="overview-hero-cta" to="/docs/quickstart">
          Get Started
        </Link>
      </div>

      <CodeBlock
        title={section.heroCode.title}
        language={section.heroCode.language}
        code={section.heroCode.code}
      />
    </section>
  );
}

function OverviewVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "XQ0S_gFz2-U";
  const posterSrc = `${import.meta.env.BASE_URL}thumbnail.png`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <section className="overview-video-section" aria-label="Navexa video walkthrough">
      <div className="overview-video-head">
        <h2>Video Walkthrough</h2>
        <p>See the tree-first PDF indexing and vectorless RAG workflow in a short demo.</p>
      </div>

      <div className="overview-video-shell">
        {isPlaying ? (
          <iframe
            className="overview-video-frame"
            src={embedSrc}
            title="Navexa overview video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="overview-video-poster"
            onClick={() => setIsPlaying(true)}
            aria-label="Play Navexa overview video"
          >
            <img src={posterSrc} alt="Navexa overview video" loading="lazy" decoding="async" />
            <span className="overview-video-play" aria-hidden="true">
              <Play size={22} fill="currentColor" strokeWidth={2.2} />
            </span>
          </button>
        )}
      </div>
    </section>
  );
}


function LazyImageLink({ to, src, label, className, eager = false }) {
  const hostRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(Boolean(eager));

  useEffect(() => {
    if (shouldLoad || eager) return;
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "220px 0px" }
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [shouldLoad, eager]);

  return (
    <Link
      ref={hostRef}
      className={`${className} ${loaded ? "is-loaded" : "is-loading"}`}
      to={to}
      aria-label={label}
    >
      <span className="lazy-image-placeholder" aria-hidden="true" />
      <img
        className="lazy-image-media"
        src={shouldLoad ? src : undefined}
        alt=""
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "low"}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </Link>
  );
}

function OverviewModels({ section }) {
  if (!Array.isArray(section.products) || section.products.length === 0) return null;

  return (
    <section id="products" className="overview-models">
      <div className="overview-models-head">
        <h2>{section.productsTitle || "Capabilities"}</h2>
      </div>

      <div className="overview-model-grid">
        {section.products.map((product, index) => (
          <article key={product.title} className="overview-model-item">
            <LazyImageLink
              className="overview-model-visual"
              to={product.to}
              src={product.image}
              label={product.title}
              eager={index === 0}
            />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function OverviewPage({ section }) {
  return (
    <>
      <header className="doc-header doc-header--overview">
        <h1>{section.title}</h1>
        <p>{section.description}</p>
      </header>

      <OverviewHero section={section} />
      <OverviewModels section={section} />
      <OverviewVideo />
    </>
  );
}

function ArticleList({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <ul className="article-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ArticleDefinitionGroups({ groups }) {
  if (!Array.isArray(groups) || groups.length === 0) return null;

  return (
    <div className="article-definition-groups">
      {groups.map((group, index) => (
        <section key={`${group.lead || group.title || "definitions"}-${index}`} className="article-definition-group">
          {group.title ? <h4>{group.title}</h4> : null}
          {group.lead || group.badge || group.trail ? (
            <h4>
              {group.lead ? <span>{group.lead} </span> : null}
              {group.badge ? <code className="article-inline-chip">{group.badge}</code> : null}
              {group.trail ? <span> {group.trail}</span> : null}
            </h4>
          ) : null}
          <ul className="article-definition-list">
            {group.items?.map((item) => (
              <li key={`${item.label}-${item.description}`}>
                <code className="article-inline-chip">{item.label}</code>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function ArticleMoreDetails({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="article-more-list">
      {items.map((item, index) => (
        <details key={`${item.title}-${index}`} className="article-more-item">
          <summary>{item.title}</summary>
          <div className="article-more-body">
            {item.body ? <p>{item.body}</p> : null}
            <ArticleDefinitionGroups groups={item.definitionGroups} />
            {item.code ? (
              <CodeBlock
                title={item.codeTitle || item.title}
                language={item.language || "text"}
                code={item.code}
              />
            ) : null}
            {item.table ? <DocTable table={item.table} /> : null}
          </div>
        </details>
      ))}
    </div>
  );
}

function ArticleListSection({ id, title, items, icon }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section id={id} className="article-section">
      <h2>
        {icon}
        {title}
      </h2>
      <ArticleList items={items} />
    </section>
  );
}

function ArticleBlockGroup({ id, title, blocks, numbered = false, icon = null }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <section id={id} className="article-section">
      <h2>
        {icon}
        {title}
      </h2>
      <div className="article-steps">
        {blocks.map((block, index) => (
          <section key={`${title}-${block.title}-${index}`} className="article-step">
            <h3>
              {numbered ? <span>{index + 1}.</span> : null}
              {block.title}
            </h3>
            {block.body ? <p>{block.body}</p> : null}
            {Array.isArray(block.bullets) && block.bullets.length ? (
              <ul className="article-step-bullets">
                {block.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            <ArticleDefinitionGroups groups={block.definitionGroups} />
            <ArticleMoreDetails items={block.moreDetails} />
            {block.code ? (
              <CodeBlock
                title={block.codeTitle || block.title}
                language={block.language || "text"}
                code={block.code}
              />
            ) : null}
            {block.table ? <DocTable table={block.table} /> : null}
          </section>
        ))}
      </div>
    </section>
  );
}

function ArticleMistakes({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="article-mistakes">
      {items.map((item, idx) => (
        <article key={`${item.mistake}-${idx}`} className="article-mistake">
          <h3>
            <AlertTriangle size={15} aria-hidden="true" />
            {item.mistake}
          </h3>
          <p>{item.fix}</p>
        </article>
      ))}
    </div>
  );
}

function ArticleDatasets({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="data-type-examples" className="article-section">
      <h2>Document type examples</h2>
      <div className="article-dataset-grid">
        {items.map((item) => (
          <article key={item.title} className="article-dataset-card">
            <LazyImageLink
              className="article-dataset-visual"
              to={item.to}
              src={item.image}
              label={item.title}
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function VariablesSection({ table }) {
  if (!table?.headers?.length || !table?.rows?.length) return null;

  return (
    <section id="variables" className="article-section">
      <h2>Variables you usually change</h2>
      <DocTable table={table} />
    </section>
  );
}

function CommonMistakesSection({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="common-mistakes" className="article-section">
      <h2>Common mistakes</h2>
      <ArticleMistakes items={items} />
    </section>
  );
}

function InternalLinkCards({ id, title, items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section id={id} className="article-section">
      <h2>{title}</h2>
      <div className="article-next-links">
        {items.map((item) => (
          <Link key={`${item.to}-${item.title}`} to={item.to} className="article-next-link-card">
            <span className="article-next-link-head">
              <strong>{item.title}</strong>
              <span className="article-next-link-icon" aria-hidden="true">
                <ArrowRight size={14} />
              </span>
            </span>
            {item.body ? <span className="article-next-link-text">{item.body}</span> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}

function NextSteps({ items }) {
  return <InternalLinkCards id="next-steps" title="Next steps" items={items} />;
}

function ArticlePage({ section, fallbackNext }) {
  return (
    <>
      <header className="doc-header doc-header--article">
        <h1>{section.title}</h1>
        <p>{section.description}</p>
      </header>

      <ArticleListSection
        id="what-this-page-is-for"
        title="What this page is for"
        items={section.whatThisPageIsFor}
        icon={<GraduationCap size={17} aria-hidden="true" />}
      />

      <ArticleListSection
        id="when-to-use"
        title="When to use it"
        items={section.whenToUse}
        icon={<CheckCircle2 size={17} aria-hidden="true" />}
      />

      <ArticleListSection
        id="before-you-start"
        title="Before you start"
        items={section.prerequisites}
        icon={<CheckCircle2 size={17} aria-hidden="true" />}
      />

      <ArticleDatasets items={section.datasets} />

      <ArticleBlockGroup
        id="minimum-working-flow"
        title={section.stepsTitle || "Minimum working flow"}
        blocks={section.steps}
        numbered
        icon={<Lightbulb size={17} aria-hidden="true" />}
      />

      <InternalLinkCards id="detail-pages" title="Read more" items={section.detailPages} />

      <VariablesSection table={section.variablesTable} />

      <ArticleBlockGroup id="sample-output" title="Sample output" blocks={section.sampleOutput} />

      <CommonMistakesSection items={section.commonMistakes} />

      <ArticleBlockGroup id="advanced-options" title="Advanced options" blocks={section.advancedOptions} />

      <ArticleBlockGroup
        id="deprecated-notes"
        title="Deprecated notes"
        blocks={section.deprecatedNotes}
      />

      {section.tryIt?.length ? (
        <section id="try-it" className="article-section">
          <h2>
            <Rocket size={17} aria-hidden="true" />
            Try it
          </h2>
          <ol className="article-try-list">
            {section.tryIt.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
      ) : null}

      {section.links?.length ? (
        <section className="article-section">
          <h2>Useful links</h2>
          <div className="article-link-pills">
            {section.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <NextSteps items={section.nextSteps?.length ? section.nextSteps : fallbackNext} />
    </>
  );
}

export default function DocsPage() {
  const { slug } = useParams();
  const section = getSectionById(slug || "");

  const sentinelRef = useRef(null);
  const nearBottom = useBottomSentinel(sentinelRef);

  if (!section) {
    return <Navigate to="/docs/overview" replace />;
  }

  if (section.groupOnly) {
    const firstChild = getFirstChildSection(section.id);
    if (firstChild) {
      return <Navigate to={`/docs/${firstChild.id}`} replace />;
    }
    return <Navigate to="/docs/overview" replace />;
  }

  const { previous, next } = getPrevNext(section.id);
  const isOverview = section.id === "overview";
  const { title: pageTitle, description: pageDescription, path: pagePath, type: pageType, structuredData } =
    buildPageMeta(section);

  const fallbackNext = useMemo(() => {
    if (!next) return [];
    return [
      {
        title: next.title,
        body: "Continue to the next page.",
        to: `/docs/${next.id}`
      }
    ];
  }, [next]);

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        path={pagePath}
        type={pageType}
        structuredData={structuredData}
      />

      <main className={`content ${isOverview ? "content--overview" : "content--article"}`}>
        {isOverview ? (
          <OverviewPage section={section} />
        ) : (
          <ArticlePage section={section} fallbackNext={fallbackNext} />
        )}

        <div ref={sentinelRef} className="pager-sentinel" aria-hidden="true" />
        <BottomPager previous={previous} next={next} visible={nearBottom} />
      </main>
    </>
  );
}
