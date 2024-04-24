import PostContentManagement from "@/components/postContentManagement";
import { ContentType, IContent } from "@/types/course";
import { useState } from "react";
import { addContent } from "../action";
import { useFormStatus } from "react-dom";
import Media from "./media";

interface IProps {
  topicId?: string;
  onExit?: () => void;
  onContentChange?: (content: IContent) => void;
  courseId?: string;
  content?: IContent;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-primary text-white font-medium text-xl flex items-center justify-center rounded w-[76px] h-[40px]"
    >
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        "Save"
      )}
    </button>
  );
};

export default function LessonModal({
  topicId,
  onExit,
  onContentChange,
  courseId,
  content: contentBody,
}: IProps) {
  const [content, setContent] = useState<IContent>(
    contentBody || {
      topic: topicId,
      course: courseId,
      title: "Untitled Lesson",
      type: "text",
    }
  );

  console.log(content);
  return (
    <div className="modal-box !max-w-[816px] w-full p-0 rounded-lg">
      <div className="flex justify-between p-4 border-b">
        <h1 className="font-bold text-[32px]">
          <input
            type="text"
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            value={content?.title}
          />
        </h1>
        <div className="flex gap-8 items-center">
          <form method="dialog" className="flex items-center">
            <button
              onClick={() => onExit && onExit()}
              className="font-medium text-xl"
            >
              Cancel
            </button>
          </form>

          <form
            action={async () => {
              const contentResult: IContent = await addContent(content);
              setContent(contentResult);
              onContentChange && onContentChange(contentResult);
              onExit && onExit();
            }}
          >
            <SubmitButton />
          </form>
        </div>
      </div>

      <div className="px-8 py-4">
        <select
          defaultValue={content.type}
          onChange={(e) => {
            const value = e.target.value;
            let type: ContentType;
            if (
              value === "text" ||
              value === "media" ||
              value === "assesment" ||
              value === "code"
            ) {
              type = value;
            }

            setContent({
              ...content,
              type,
            });
          }}
          className="select select-bordered w-full max-w-xs"
        >
          <option value={"text"}>Text</option>
          <option value={"media"}>Image & Video</option>
        </select>

        {content.type === "text" && (
          <div className="mt-4">
            <PostContentManagement
              className="h-[368px]"
              content={content.text}
              onUpdate={(text) =>
                setContent({
                  ...content,
                  type: "text",
                  text,
                })
              }
            />
          </div>
        )}

        {content.type === "media" && (
          <div className="flex flex-col">
            <Media
              value={content.media}
              onChange={(file) => {
                setContent({ ...content, type: "media", media: file });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
