import React, { FC, useEffect, useState } from "react";

import { Search } from "lucide-react";
import { useTranslation } from "next-i18next";

import Result from "@/components/Result";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useUserDevice } from "@/context/UserDeviceContext";
import { useJobsPageStore } from "@/lib/store/zustand";
import { useJobsQuery } from "@/services/jobs";

import JobsPagination from "../JobsPagination";

const JobsPage: FC<IJobsPageProps> = () => {
  const [perPage, setPerPage] = useState<string>("10");
  const [orderBy, setOrderBy] = useState<{ field: string; direction: string }>();
  const [searchType, setSearchType] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [search, setSearch] = useState<{ field: string | undefined; query: string | undefined }>();
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation("common");
  const { isMobile } = useUserDevice();
  const { setShowAppliedJobs, setCurrentPage, currentPage, setTotalPages, totalPages } = useJobsPageStore();

  const { data: paginatedData, isLoading, refetch } = useJobsQuery(currentPage, parseInt(perPage), orderBy, search);
  const jobs = paginatedData?.data || [];

  useEffect(() => {
    if (paginatedData?.meta) {
      setTotalPages(paginatedData.meta.total);
      setCurrentPage(paginatedData.meta.page);
    }
  }, [paginatedData]);

  const handleSorting = (val: string) => {
    let orderObject;
    switch (val) {
      case "asc":
        orderObject = { field: "salary", direction: "asc" };
        break;
      case "desc":
        orderObject = { field: "salary", direction: "desc" };
        break;
      default:
        orderObject = undefined;
    }

    setOrderBy(orderObject);
  };

  return (
    <div className="w-full lg:h-[90vh]">
      <div className="border bg-primary-foreground py-2 lg:px-16 lg:flex justify-between items-center gap-12">
        <div className="w-full flex justify-start lg:justify-between items-center flex-wrap gap-2">
          <div className="flex justify-start items-center gap-2 mb-2 lg:mb-0">
            <Select onValueChange={val => setSearchType(val)}>
              <SelectTrigger className="w-[20%] lg:w-[130px]">
                <SelectValue placeholder={t("filter.search.searchType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value=" ">_</SelectItem>
                  <SelectItem value="companyName">{t("companyName")}</SelectItem>
                  <SelectItem value="name">{t("jobItem.jobName")}</SelectItem>
                  <SelectItem value="keyword">{t("jobItem.keywords")}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              type="text"
              className="border h-10 w-[100%] lg:w-[250px]"
              placeholder={t("filter.search.placeholder")}
              onChange={e => setInputValue(e.target.value)}
            />
            <Button
              size="sm"
              onClick={() => {
                if (!searchType || !inputValue || inputValue.trim() === "" || searchType.trim() === "") {
                  setSearch(undefined);
                  setError(t("searchError"));
                  inputValue.trim() === "" && refetch();
                } else {
                  setSearch({ field: searchType, query: inputValue });
                  setError(null);
                }
              }}
            >
              <Search />
            </Button>
          </div>
          <Select onValueChange={handleSorting}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder={t("filter.sort")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">{t("filter.sortings.suggested")}</SelectItem>
                <SelectItem value="asc">{t("filter.sortings.salaryCheapToExpensive")}</SelectItem>
                <SelectItem value="desc">{t("filter.sortings.salaryExpensiveToCheap")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {isMobile && <Button onClick={() => setShowAppliedJobs(true)}>{t("showAppliedJobs")}</Button>}
          {error && <p className="w-full text-sm text-red-700">{error}!</p>}
        </div>
      </div>
      <Result result={jobs} isLoading={isLoading} />
      <div className="border bg-primary-foreground px-6 lg:px-24 py-4 flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-0">
        {isMobile ? (
          <div className="flex justify-center items-center gap-3">
            <div className="text-sm">
              <span className="font-semibold">{t("totalPage")}</span>: {totalPages}
            </div>
            <Select onValueChange={val => setPerPage(val)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder={perPage} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"5"}>5</SelectItem>
                  <SelectItem value={"10"}>10</SelectItem>
                  <SelectItem value={"15"}>15</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="text-sm">
            <span className="font-semibold">{t("totalPage")}</span>: {totalPages}
          </div>
        )}
        <JobsPagination maxVisiblePages={4} />
        {!isMobile && (
          <Select onValueChange={val => setPerPage(val)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"5"}>5</SelectItem>
                <SelectItem value={"10"}>10</SelectItem>
                <SelectItem value={"15"}>15</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
