import { SonarCategory } from "./SonarCategory";
import { SonarMetaData } from "./SonarMetaData";

export class SonarMetaHelper {

    private prefixComponentMeasures = "https://sonarcloud.io/component_measures?id=";
    private prefixDashboard = "https://sonarcloud.io/dashboard?id=";
    //////////////////////////////////////////////////////////////////////////////////////////////private prefixProject = "https://sonarcloud.io/project/issues?id=";
    private sonarMetaData: SonarMetaData;

    constructor() {
        this.sonarMetaData = new SonarMetaData();
    }

    public GetSonarMetaData(sonarCategory: SonarCategory): SonarMetaData {

        switch (sonarCategory) {
            case SonarCategory.QualityGateStatus: {
                this.sonarMetaData.badgeQueryString = "&metric=alert_status";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixDashboard;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "";
                break;
            }
            case SonarCategory.Bugs: {
                this.sonarMetaData.badgeQueryString = "&metric=bugs";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&metric=bugs";
                break;
            }
            case SonarCategory.CodeSmells: {
                this.sonarMetaData.badgeQueryString = "&metric=code_smells";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&metric=code_smells";
                break;
            }
            case SonarCategory.Coverage: {
                this.sonarMetaData.badgeQueryString = "&metric=coverage";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&metric=Coverage";
                break;
            }
            case SonarCategory.DuplicatedLinesDensity: {
                this.sonarMetaData.badgeQueryString = "&metric=duplicated_lines_density";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&metric=duplicated_lines";
                break;
            }
            case SonarCategory.NumberOfLinesOfCode: {
                this.sonarMetaData.badgeQueryString = "&metric=ncloc";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&metric=ncloc";
                break;
            }
            case SonarCategory.ReliabilityRating: {
                this.sonarMetaData.badgeQueryString = "&metric=reliability_rating";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&metric=reliability_rating";
                break;
            }
            case SonarCategory.SecurityRating: {
                this.sonarMetaData.badgeQueryString = "&metric=security_rating";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&metric=security_rating";
                break;
            }
            case SonarCategory.TechnicalDebt: {
                this.sonarMetaData.badgeQueryString = "&metric=sqale_index";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&metric=sqale_index";
                break;
            }
            case SonarCategory.Maintainability: {
                this.sonarMetaData.badgeQueryString = "&metric=sqale_rating";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&metric=sqale_rating";
                break;
            }
            case SonarCategory.Vulnerabilities: {
                this.sonarMetaData.badgeQueryString = "&metric=vulnerabilities";
                this.sonarMetaData.badgeHyperlinkTargetUrlPrefix = this.prefixComponentMeasures;
                this.sonarMetaData.badgeHyperlinkTargetUrlSuffix = "&metric=vulnerabilities";
                break;
            }
        }

        return this.sonarMetaData;
    }
}
