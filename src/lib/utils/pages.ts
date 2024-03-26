import Error from "@/components/Error";
import Homepage from "@/components/Homepage";
import JobsPage from "@/components/JobsPage";
import { getAllJobs } from "@/services/jobs";

export const PAGE_MAP: PageMap = {
    en: { Main: `/`, Jobs: `/jobs`},
    tr: { Main: `/`, Jobs: `/is-ilanlari`},
};

const PAGE_TO_COMPONENT_MAP = (locale: string) => {
    const PAGE = PAGE_MAP[locale] || PAGE_MAP.en;

    return {
      [PAGE.Main]: Homepage,
      [PAGE.Jobs]: JobsPage,
    };
};

export const PAGE_TO_METHODS = (locale: string) => {
    const PAGE = PAGE_MAP[locale] || PAGE_MAP.en;

    return {
    //    [PAGE.Main]: () => {},
       [PAGE.Jobs]: async (_p: string) => await getAllJobs(_p),
    };
};

export const RenderPage = (page: keyof typeof PAGE_MAP, locale: string) => {
    const Component = PAGE_TO_COMPONENT_MAP(locale)[page];

    return Component || Error;
};

export const SupportedLanguages = ['en', 'tr']