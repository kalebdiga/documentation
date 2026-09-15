export const IdempotencyKeyGenerator = () => {
  const createKey = () => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };

  const [key, setKey] = useState(createKey);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setKey(createKey());
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_error) {
      setCopied(false);
    }
  };

  return (
    <div className="not-prose my-4 rounded-xl border border-zinc-950/10 bg-zinc-50 p-4 dark:border-white/10 dark:bg-zinc-900/40">
      <p className="mb-1 text-sm font-medium text-zinc-950 dark:text-white">
        Test here — you can use this UUID
      </p>
      <p className="mb-3 text-sm text-zinc-950/70 dark:text-white/70">
        Copy it into the <code className="rounded bg-zinc-950/5 px-1 py-0.5 text-xs dark:bg-white/10">idem-key</code> header
        in Try it or curl. Generate a new value for every new player create.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <code className="block min-w-0 flex-1 overflow-x-auto rounded-lg border border-zinc-950/10 bg-white px-3 py-2 font-mono text-sm text-zinc-950 dark:border-white/10 dark:bg-zinc-950 dark:text-white">
          {key}
        </code>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            className="rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800"
          >
            Generate
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg bg-teal-700 px-3 py-2 text-sm font-medium text-white hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};
