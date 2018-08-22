import { SonarCategory } from "./SonarCategory";
import { SonarMetaData } from "./SonarMetaData";

export class SonarMetaHelper {

    private sonarMetaData: SonarMetaData;

    constructor() {
        this.sonarMetaData = new SonarMetaData();
    }

    public GetSonarMetaData(sonarCategory: SonarCategory): SonarMetaData {

        switch (sonarCategory) {
            case SonarCategory.SonarAlertStatus: {
                this.sonarMetaData.sonarBadgeQueryStringParam = "alert_status";
                this.sonarMetaData.sonarTargetUrlSuffix = "&resolved=false&types=ALERT_STATUS";
                break;
            }
            case SonarCategory.SonarBugs: {
                this.sonarMetaData.sonarBadgeQueryStringParam = "bugs";
                this.sonarMetaData.sonarTargetUrlSuffix = "&resolved=false&types=BUGS";
                break;
            }
            case SonarCategory.SonarCodeSmells: {
                this.sonarMetaData.sonarBadgeQueryStringParam = "code_smells";
                this.sonarMetaData.sonarTargetUrlSuffix = "&resolved=false&types=CODE_SMELLS";
                break;
            }
        }

        return this.sonarMetaData;
    }
}
