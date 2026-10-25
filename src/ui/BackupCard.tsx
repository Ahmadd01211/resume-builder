export default function BackupCard({ lastBackupAt, persistent, onBackup, onPersist }: { lastBackupAt: number | null; persistent: boolean; onBackup: () => void; onPersist: () => void }) {
  const age = lastBackupAt ? Date.now() - lastBackupAt : Infinity;
  const reminder = age > 7 * 24 * 60 * 60 * 1000;
  const backupLabel = lastBackupAt ? `Last backup: ${new Date(lastBackupAt).toLocaleDateString()}` : 'No backup recorded on this device';
  return <section className={`backup-card ${reminder ? 'backup-reminder' : ''}`} aria-label="Resume backup">
    <div><strong>{reminder ? 'Keep a copy of your resumes' : 'Your backup is up to date'}</strong><p>{backupLabel}. A backup file lets you restore your resumes if browser data is cleared.</p></div>
    <div className="backup-actions"><button type="button" className="button" onClick={onBackup}>Download backup</button>{!persistent && <button type="button" className="backup-persist" onClick={onPersist}>Protect browser storage</button>}</div>
  </section>;
}
