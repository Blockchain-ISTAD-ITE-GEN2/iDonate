import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BannerComponent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Donations */}
      <Card className="flex flex-col gap-4 bg-iDonate-light-gray rounded-lg border-0 shadow-light py-4 dark:bg-iDonate-dark-mode">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            Total Donations
          </CardTitle>
          <span className="text-sm text-iDonate-navy-primary dark:text-iDonate-green-secondary">
            2024
          </span>
        </CardHeader>

        <CardContent>
          <div className="text-title-eng text-iDonate-green-primary font-bold dark:text-iDonate-green-secondary">
            $150,789.00
          </div>
          <p className="text-sub-description-eng text-iDonate-gray dark:text-iDonate-navy-accent">
            +35% from last month
          </p>
        </CardContent>
      </Card>

      {/* Active Donors */}
      <Card className="flex flex-col gap-4 bg-iDonate-light-gray rounded-lg border-0 shadow-light py-4 dark:bg-iDonate-dark-mode">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            Active Donors
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground dark:text-iDonate-navy-accent"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        </CardHeader>

        <CardContent>
          <div className="text-title-eng text-iDonate-green-primary font-bold dark:text-iDonate-green-secondary">
            3,580
          </div>
          <p className="text-sub-description-eng text-iDonate-gray dark:text-iDonate-navy-accent">
            +12% from last month
          </p>
        </CardContent>
      </Card>

      {/* New Supporters */}
      <Card className="flex flex-col gap-4 bg-iDonate-light-gray rounded-lg border-0 shadow-light py-4 dark:bg-iDonate-dark-mode">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            New Supporters
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground dark:text-iDonate-navy-accent"
          >
            <path d="M2 10h20" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        </CardHeader>

        <CardContent>
          <div className="text-title-eng text-iDonate-green-primary font-bold dark:text-iDonate-green-secondary">
            1,200
          </div>
          <p className="text-sub-description-eng text-iDonate-gray dark:text-iDonate-navy-accent">
            +20% from last month
          </p>
        </CardContent>
      </Card>

      {/* Successful Campaigns */}
      <Card className="flex flex-col gap-4 bg-iDonate-light-gray rounded-lg border-0 shadow-light py-4 dark:bg-iDonate-dark-mode">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-medium-eng font-normal text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
            Successful Campaigns
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground dark:text-iDonate-navy-accent"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>

        <CardContent>
          <div className="text-title-eng text-iDonate-green-primary font-bold dark:text-iDonate-green-secondary">
            285
          </div>
          <p className="text-sub-description-eng text-iDonate-gray dark:text-iDonate-navy-accent">
            +30% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
