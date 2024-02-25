import React from "react";

interface IProps {
  boughtCourse: React.ReactNode;
  buyCourse: React.ReactNode;
}
const isBought = () => {
  return true;
};

export default function layout({ boughtCourse, buyCourse }: IProps) {
  return isBought() ? boughtCourse : buyCourse;
}
