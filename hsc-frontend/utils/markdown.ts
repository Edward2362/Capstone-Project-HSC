import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export const convertMdToHtml = (
	markdown: string | undefined,
	id: string | undefined
) => {
	if (!!markdown) {
		var replaceId = markdown.replaceAll(
			"diagnosisHistoryId=",
			`diagnosisHistoryId=${id}`
		);
		return parser.render(replaceId);
	}
	return "";
};
