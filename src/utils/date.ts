import _dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

export const dayjs = _dayjs;

dayjs.extend(duration);
