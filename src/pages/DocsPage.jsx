import { AlertTriangle, ArrowRight, CheckCircle2, GraduationCap, Lightbulb } from "../lib/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import BottomPager from "../components/BottomPager";
import CodeBlock from "../components/CodeBlock";
import DocTable from "../components/DocTable";
import { getSectionById, getPrevNext } from "../content/navexaDocs";
import useBottomSentinel from "../hooks/useBottomSentinel";

function OverviewHero({ section }) {
  if (!section.heroCode) return null;

  return (
    <section id="hero-quickstart" className="overview-hero-card">
      <div className="overview-hero-copy">
        <h2>Developer quickstart</h2>
        <p>
          Make your first index in minutes. Learn the core workflow before moving into
          reasoning and production integration.
        </p>
        <Link className="overview-hero-cta" to="/docs/install">
          Get started
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
        <h2>Capabilities</h2>
        {/* <span>View all</span> */}
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
      </header>

      <OverviewHero section={section} />
      <OverviewModels section={section} />
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

function ArticleSteps({ steps }) {
  if (!Array.isArray(steps) || steps.length === 0) return null;

  return (
    <div className="article-steps">
      {steps.map((step, index) => (
        <section key={`${step.title}-${index}`} className="article-step">
          <h3>
            <span>{index + 1}.</span>
            {step.title}
          </h3>
          <p>{step.body}</p>
          {Array.isArray(step.bullets) && step.bullets.length ? (
            <ul className="article-step-bullets">
              {step.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {step.code ? (
            <CodeBlock title={step.title} language={step.language || "text"} code={step.code} />
          ) : null}
          {step.table ? <DocTable table={step.table} /> : null}
        </section>
      ))}
    </div>
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
    <section className="article-section">
      <h2>Data type examples</h2>
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

function NextSteps({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="next-steps" className="article-section">
      <h2>Next steps</h2>
      <div className="article-next-links">
        {items.map((item) => (
          <Link key={`${item.to}-${item.title}`} to={item.to}>
            {item.title}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArticlePage({ section, fallbackNext }) {
  return (
    <>
      <header className="doc-header doc-header--article">
        <h1>{section.title}</h1>
        <p>{section.description}</p>
      </header>

      <section id="what-you-build" className="article-section">
        <h2>
          <GraduationCap size={17} aria-hidden="true" />
          What you'll build
        </h2>
        <ArticleList items={section.whatYouBuild} />
      </section>

      <section id="prerequisites" className="article-section">
        <h2>
          <CheckCircle2 size={17} aria-hidden="true" />
          Prerequisites
        </h2>
        <ArticleList items={section.prerequisites} />
      </section>

      <ArticleDatasets items={section.datasets} />

      <section id="steps" className="article-section">
        <h2>
          <Lightbulb size={17} aria-hidden="true" />
          Step-by-step
        </h2>
        <ArticleSteps steps={section.steps || []} />
      </section>

      <section id="why-this-matters" className="article-section">
        <h2>Why this matters</h2>
        <ArticleList items={section.whyThisMatters} />
      </section>

      <section id="common-mistakes" className="article-section">
        <h2>Common mistakes</h2>
        <ArticleMistakes items={section.commonMistakes} />
      </section>

      <section id="try-it" className="article-section">
        <h2>Try it</h2>
        <ol className="article-try-list">
          {(section.tryIt || []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

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

  const { previous, next } = getPrevNext(section.id);
  const isOverview = section.id === "overview";

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
    <main className={`content ${isOverview ? "content--overview" : "content--article"}`}>
      {isOverview ? (
        <OverviewPage section={section} />
      ) : (
        <ArticlePage section={section} fallbackNext={fallbackNext} />
      )}

      <div ref={sentinelRef} className="pager-sentinel" aria-hidden="true" />
      <BottomPager previous={previous} next={next} visible={nearBottom} />
    </main>
  );
}
