import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function EvenDetailDescription() {
  return (
    <div>
      <Card className="w-full border-2 border-iDonate-navy-accent">
        <div>
          <CardHeader>
            <CardTitle className="text-iDonate-navy-primary font-semibold text-2xl dark:text-iDonate-navy-accent">
              ផ្ដើមចេញពីយើង ដើម្បីអនាគតកុមារកម្ពុជានិងប្រទេសរបស់យើងទាំងអស់គ្នា
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="text-iDonate-navy-primary text-lg leading-9 dark:text-iDonate-navy-accent">
              រាជធានីភ្នំពេញ ថ្ងៃទី ២១ ខែមីនា ឆ្នាំ ២០២៤ -
              យូនីសេហ្វ​ចាប់ផ្តើមផ្សព្វផ្សាយយុទ្ធនាការ​ឌីជីថល​ប្រកបដោយភាពច្នៃប្រឌិតមួយ
              ដើម្បីទប់ស្កាត់
              និងការពារក្មេងវ័យជំទង់កម្ពុជាពី​ជនរំលោភបំពានផ្លូវភេទតាមអនឡាញ។
              យោងតាមរបាយការណ៍មួយនៅឆ្នាំ ២០២២ ដែលមានចំណងជើងថា
              ការបញ្ឈប់គ្រោះថ្នាក់នៅក្នុងប្រទេសកម្ពុជា
              ដែលចេញផ្សាយដោយក្រុមប្រឹក្សាជាតិកម្ពុជាដើម្បីកុមារ
              និងដៃគូដែលរួមទាំងយូនីសេហ្វ ១១ ភាគរយនៃកុមារដែលប្រើអ៊ីនធឺណិត អាយុពី
              ១២ ទៅ ១៧ ឆ្នាំ នៅក្នុងប្រទេសកម្ពុជាបានទទួលរងការកេងប្រវ័ញ្ច
              និងការបំពានផ្លូវភេទលើប្រព័ន្ធអ៊ីនធឺណិតកាលពីមួយឆ្នាំមុន។
              នេះមានន័យថាកុមារប្រមាណ ១៦០.០០០ នាក់
              ត្រូវបានគេគំរាមឱ្យចូលរួមពាក់ព័ន្ធនឹងសកម្មភាពផ្លូវភេទ
              មានការចែករំលែករូបភាពអាសអាភាសដោយគ្មានការយល់ព្រមពីពួកគេ
              ឬប្រឈមមុខនឹងការបំពានតាមអ៊ីនធឺណិតតាមរូបភាពផ្សេងៗទៀត ។
            </CardDescription>
          </CardContent>
        </div>

        <div>
          <CardHeader>
            <CardTitle className="text-iDonate-navy-primary font-semibold text-2xl dark:text-iDonate-navy-accent">
              អ្វីដែលយើងចង់បាន គឺកុមារកម្ពុជាអាចទទួលបានការអប់រំមួយដែលប្រសើរ
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="text-iDonate-navy-primary text-lg leading-9 dark:text-iDonate-navy-accent">
              កិច្ចខិតខំប្រឹងប្រែងទាំងនេះ
              គឺជាផ្នែកមួយនៃការប្តេជ្ញាចិត្តរបស់យូនីសេហ្វ
              ក្នុងការកសាងពិភពឌីជីថលមួយ
              ដែលមានសុវត្ថិភាពជាងមុនសម្រាប់កុមារគ្រប់រូបនៅក្នុងប្រទេសកម្ពុជា។
              នៅក្នុងឆ្នាំ ២០២៣ យូនីសេហ្វ បានអនុវត្តយុទ្ធនាការ ដែលមានឈ្មោះថា
              “តោះ ឆាតលេង” អំពីការលួងលោមតាមអនឡាញ ដែលបានផ្សាយទៅដល់ប្រជាជនចំនួន
              ២លាននាក់ តាមប្រព័ន្ធផ្សព្វផ្សាយសង្គម។
              យុទ្ធនាការនេះមានគោលបំណងកាត់បន្ថយឧប្បត្តិហេតុនៃការកេងប្រវ័ញ្ចផ្លូវភេទ
              និងការរំលោភបំពានតាមអនឡាញ ក្នុងចំណោមកុមារដែលប្រើអ៊ីនធឺណិត
              តាមរយៈការអនុវត្តដែលមានលក្ខណៈអន្តរកម្ម និងច្នៃប្រឌិត
              ដើម្បីឆ្លើយតបចំពោះល្បិចកល “លួងលោម” កុមារលើអនឡាញ។​
            </CardDescription>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
