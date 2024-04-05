import {
  fetchCourseDetails,
  fetchCourseTopics,
} from "@/app/(main)/course-creation/action";
import { FormatCourseFormat, ICourse, ITopic } from "@/types/course";
import { formatPrice } from "@/utils/formatter";
import { MdOutlineDiscount } from "@react-icons/all-files/md/MdOutlineDiscount";
import AddToCart from "./addToCart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ICart } from "@/types/cart";

interface IProps {
  params: { id: string };
}

const fetchCartByUserAndCourseId = async (courseId: string) => {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    `${process.env.API_URI}/api/v1/carts/${session?.user._id}/${courseId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.user.tokens.accessToken,
      },
    }
  );

  if (!res.ok) {
    return null;
  }
  
  return res.json();
};

export default async function page({ params: { id: courseId } }: IProps) {
  const fetchCourse = fetchCourseDetails(courseId);
  const fetchTopics = fetchCourseTopics(courseId);
  const fetchCartItem = fetchCartByUserAndCourseId(courseId);

  const [course, topics, cartItem]: [
    course: ICourse,
    topics: Array<ITopic>,
    cartItem: ICart
  ] = await Promise.all([fetchCourse, fetchTopics, fetchCartItem]);

  return (
    <div className="px-6 py-4">
      <div className="flex gap-6">
        <section className="bg-white w-full rounded-lg p-4 border border-gray border-opacity-20">
          <h1 className="font-semibold text-3xl capitalize">{course.name}</h1>
          <h2 className="text-gray mt-2 capitalize">
            Taught in {course.language}
          </h2>
          <table className="mt-3">
            <tbody>
              <tr>
                <td className="text-gray py-2">Instructor: </td>
                <td className="px-2 py-2">{}</td>
              </tr>
              <tr>
                <td className="text-gray py-2">Format: </td>
                <td className="px-2 py-2">
                  {FormatCourseFormat[String(course.format)]}
                </td>
              </tr>
              <tr>
                <td className="text-gray py-2">Category: </td>
                <td className="px-2 py-2">Programming</td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col gap-2">
            <h2 className="mt-8 text-[#FD661F] font-semibold">
              ₱ {formatPrice(course.pricing?.price || 0)}
            </h2>

            {course.pricing?.allowDiscount && (
              <h3 className="flex items-center gap-2">
                <span>
                  <MdOutlineDiscount size={24} />
                </span>
                Discount Available at {course.pricing?.pointsNeeded}+ Points
              </h3>
            )}
          </div>

          <AddToCart courseId={courseId} cart={cartItem} />
          <div className="w-full border border-gray border-opacity-20 my-10"></div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-xl">About</h3>
            <p className="text-[#121212]">{course.description}</p>
          </div>

          <div className="w-full border border-gray border-opacity-20 my-10"></div>

          <div className="flex flex-col gap-2 mb-10">
            <h3 className="font-semibold text-xl">
              What skill you will learn?
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {course.skills?.map((skill, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <h4 className="font-medium capitalize">{skill.name}</h4>
                  <p className="text-[#121212] capitalize">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white w-full rounded-lg p-4 h-fit border border-gray border-opacity-20">
          <h1 className="font-semibold text-xl">Course Outline</h1>
          <div className="mt-4 flex flex-col gap-4">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="p-4 border border-gray border-opacity-20"
              >
                <span className="font-medium">{topic.title}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
