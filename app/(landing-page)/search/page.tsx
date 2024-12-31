import { SearchPage } from "@/components/search/SearchOnPageComponent";

export default function Events() {
  return (
    <section className="flex flex-col py-9 gap-9 justify-center">
      <div className="w-full mx-auto px-10 md:mx-0 flex flex-col items-center justify-center gap-2">
        <h2
          lang="km"
          className="text-iDonate-navy-primary text-heading-one-khmer dark:text-iDonate-green-primary"
        >
          ស្វែងរក កម្មវិធីបរិច្ចាគដែលអ្នកពេញចិត្ត
        </h2>
        <h4
          lang="km"
          className="text-iDonate-navy-primary text-medium-khmer dark:text-white "
        >
          {" "}
          ស្វែងរកកម្មវិធី រៃអង្គាសដោយ ឈ្មោះនៃអង្គភាព​ ប្រភេទ និង
          កាលបរិច្ឆេទនៃកម្មវិធី
        </h4>
      </div>

      <SearchPage />
    </section>
  );
}
