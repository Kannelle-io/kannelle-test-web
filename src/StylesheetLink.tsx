import React, { FunctionComponent } from "react";

type Props = {
  url: string;
};

const StylesheetLink: FunctionComponent<Props> = ({ url }: Props) => {
  return <link href={url} rel="stylesheet" />;
};

export default StylesheetLink;
