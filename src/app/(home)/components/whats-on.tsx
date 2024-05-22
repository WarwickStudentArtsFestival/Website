import { FiArrowRight } from 'react-icons/fi';

export default function WhatsOn() {
  return (
    <section className="mb-12">
      <h2>What&apos;s On?</h2>
      <p className="max-w-6xl mx-auto px-4 mb-1">
        Across <strong>Saturday 8th June</strong>,{' '}
        <strong>Sunday 9th June</strong> and <strong>Monday 10th June</strong>{' '}
        we&apos;ll feature a{' '}
        <a href="/events" className="text-accent">
          huge variety of events
        </a>{' '}
        across all our{' '}
        <a href="/venues" className="text-accent">
          on-campus venues
        </a>
        . You can find the{' '}
        <a href="/schedule" className="text-accent">
          full event schedule here
        </a>
        .
      </p>

      <div className="mb-2">
        <p>[WHATS ON CARDS]</p>
      </div>

      <a
        href="/events"
        className="inline-block bg-tertiary px-4 py-1 rounded-sm drop-shadow-sm hover:scale-105 mb-4"
      >
        <span className="text-xl lg:text-2xl uppercase font-bold">
          <FiArrowRight className="inline mr-2 mb-1" />
          View the Full List
        </span>
      </a>
    </section>
  );
}