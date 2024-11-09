import * as bcrypt from 'bcrypt';

export async function hashPassword(password): Promise<string> {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
}

export async function comparePassword(password, hash): Promise<boolean> {
  const comparePassword = await bcrypt.compare(password, hash);
  return comparePassword;
}
