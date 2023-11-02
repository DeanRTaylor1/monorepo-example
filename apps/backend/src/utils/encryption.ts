import { BinaryLike, scrypt } from "crypto";
import { promisify } from "util";

export const scryptAsync: (
  arg1: BinaryLike,
  arg2: BinaryLike,
  arg3: number
) => Promise<Buffer> = promisify(scrypt);
