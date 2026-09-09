import { n8nAmbassadorProfileUrl } from '@/lib/site-config';
import '@/styles/profile-roles.css';

export default function ProfileRoles({ roles }: { roles: string[] }) {
  return (
    <ul className="profile-roles">
      {roles.map(role => (
        <li key={role}>
          {role === 'n8n Ambassador'
            ? <a href={n8nAmbassadorProfileUrl} target="_blank" rel="noopener noreferrer">{role} <span aria-hidden="true">↗</span></a>
            : role}
        </li>
      ))}
    </ul>
  );
}
