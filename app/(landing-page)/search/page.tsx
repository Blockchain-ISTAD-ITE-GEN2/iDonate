
import {SearchPage} from "@/components/search/SearchOnPageComponent";

export default function Events() {
    return (
        <section className="flex flex-col py-9 gap-9">
      <div
        lang="km"
        className="w-full flex flex-col items-center justify-center gap-2"
      >
        <h2 className="text-iDonate-navy-primary text-heading-one-khmer">
          ស្វែករក កម្មវិធីបរិច្ចាគដែលអ្នកពេញចិត្ត
        </h2>
        <h4 className="text-iDonate-navy-primary text-medium-khmer">
          {" "}
          ស្វែករកម្មបវិធី វៃអង្គាសដោយ ឈ្មោះនៃអង្កការភាព​ ប្រភេទ និង
          កាលបរិច្ឆេទ្នាំនៃកម្មវិធី
        </h4>
      </div>

      <SearchPage />
    </section>
    );
  }