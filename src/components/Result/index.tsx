import React, { FC } from "react";

const Result: FC<IResultProps> = ({ result }) => {
  return result && result.length > 0
    ? result.map((job, i) => {
        return (
          <div key={i}>
            <div>{job.name}</div>
          </div>
        );
      })
    : "Üzgünüz bir hata oluştu.";
};

export default Result;
