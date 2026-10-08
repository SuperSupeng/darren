import { contactEmail } from '@/lib/site-config';
import { jobsCopy } from '@/lib/services-copy';

export default function JobsNote({ locale }: { locale: string }) {
  const copy = locale === 'zh' ? jobsCopy.zh : jobsCopy.en;

  return (
    <p className="jobs-note">
      <a href={`mailto:${contactEmail}`}>{copy.label}</a>
      <span>{copy.body}</span>
    </p>
  );
}
