import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Report",
};

export default function CourseReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
