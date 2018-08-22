import { SonarCategory } from "./SonarCategory";
import { SonarMetaData } from "./SonarMetaData";

export class SonarMetaHelper {

    private sonarMetaData: SonarMetaData;
    private prefixProject = "https://sonarcloud.io/project/issues?id=";
    private prefixComponentMeasures = "https://sonarcloud.io/component_measures?id=";

    constructor() {
        this.sonarMetaData = new SonarMetaData();
    }

    public GetSonarMetaData(sonarCategory: SonarCategory): SonarMetaData {

        switch (sonarCategory) {
            case SonarCategory.QualityGateStatus: {
                this.sonarMetaData.badgeQueryString = "&metric=alert_status";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixProject;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&resolved=false&types=ALERT_STATUS";/////////////////////////////////not ok
                break;
            }
            case SonarCategory.Bugs: {
                this.sonarMetaData.badgeQueryString = "&metric=bugs";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&resolved=false&types=BUG";   
                break;
            }
            case SonarCategory.CodeSmells: {
                this.sonarMetaData.badgeQueryString = "&metric=code_smells";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixProject;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&resolved=false&types=CODE_SMELL"; 
                break;
            }
            case SonarCategory.Coverage: {
                this.sonarMetaData.badgeQueryString = "&metric=coverage";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&resolved=false&types=COVERAGE"; 
                break;
            }
            case SonarCategory.DuplicatedLinesDensity: {
                this.sonarMetaData.badgeQueryString = "&metric=duplicated_lines_density";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&resolved=false&types=DUPLICATED_LINES_DENSITY";
                break;
            }
            case SonarCategory.NumberOfLinesOfCode: {
                this.sonarMetaData.badgeQueryString = "&metric=ncloc";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&resolved=false&types=NCLOC";
                break;
            }
            case SonarCategory.ReliabilityRating: {
                this.sonarMetaData.badgeQueryString = "&metric=reliability_rating";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&resolved=false&types=RELIABILITY_RATING";
                break;
            }
            case SonarCategory.SecurityRating: {
                this.sonarMetaData.badgeQueryString = "&metric=security_rating";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&resolved=false&types=SECURITY_RATING";
                break;
            }
            case SonarCategory.TechnicalDebt: {
                this.sonarMetaData.badgeQueryString = "&metric=sqale_index";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixProject;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&resolved=false&types=SQALE_INDEX";/////////////////////////////////not ok
                break;
            }
            case SonarCategory.Maintainability: {
                this.sonarMetaData.badgeQueryString = "&metric=sqale_rating";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixProject;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&resolved=false&types=SQALE_RATING";////////////////////////////////not ok
                break;
            }
            case SonarCategory.Vulnerabilities: {
                this.sonarMetaData.badgeQueryString = "&metric=vulnerabilities";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixProject;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&resolved=false&types=VULNERABILITY";
                break;
            }
        }

        return this.sonarMetaData;
    }
}
