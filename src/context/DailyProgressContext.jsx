import { createContext } from "react";

const DailyProgressContext = createContext([0, () => {}]);

export default DailyProgressContext;