import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const fetchCoursesReport = async () => {
    try {
        const session = await getServerSession(authOptions);
        const res = await fetch(`${process.env.API_URI}/api/v1/course/reports`, {
            headers: {
                authorization: "Bearer " + session?.user.tokens.accessToken,
            },
        });

        if (!res.ok) throw new Error("Server error.");

        return res.json();
    } catch (error) {
        return [];
    }
};

export const fetchCourseReport = async (courseId: string | undefined) => {
    try {
        if (!courseId) throw new Error('Server error.')

        const session = await getServerSession(authOptions);
        const res = await fetch(`${process.env.API_URI}/api/v1/course/reports/${courseId}`, {
            headers: {
                authorization: "Bearer " + session?.user.tokens.accessToken,
            },
        });

        if (!res.ok) throw new Error("Server error.");
        return res.json();
    } catch (error) {
        return null;
    }
};

export const fetchCourseStudents = async (courseId: string | undefined) => {
    try {
        if (!courseId) throw new Error('Server error.')

        const session = await getServerSession(authOptions);
        const res = await fetch(`${process.env.API_URI}/api/v1/course/reports/${courseId}/students`, {
            headers: {
                authorization: "Bearer " + session?.user.tokens.accessToken,
            },
        });

        if (!res.ok) throw new Error("Server error.");
        return res.json();
    } catch (error) {
        return [];
    }
};


