import Categories from "./categories"
import ContentModal from "./contentModal"
import Posts from "./posts"

export default function Feed() {

    return (
        <>
            <div className="w-full flex flex-col gap-6">
                {/* Thread Creation */}
                <ContentModal />

                {/* Categories */}
                <Categories />

                {/* Posts */}
                <Posts />
            </div>
        </>
    )
}
