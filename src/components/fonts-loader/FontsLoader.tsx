import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StylesheetLink from '../../StylesheetLink';

type Props = {
  charterId: number;
  token: string;
};

const FontsLoader = ({ charterId, token }: Props) => {
  const apiUrl = 'https://dev.rest.kannelle.io/v4';

  const [publicFontFamilies, setPublicFontFamilies] = useState<any[]>();
  const [charterFontFamilies, setCharterFontFamilies] = useState<any[]>();

  // Fetch the Kannelle public fonts
  useEffect(() => {
    axios
      .get(`${apiUrl}/fontfamilies`, {
        timeout: 30000,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((response) => {
        const { data } = response;
        setPublicFontFamilies(data.items);
      })
      .catch((e) => {
        console.error('Error during public fonts fetch', e);
      });
  }, [token]);

  // Fetch the charter private fonts
  useEffect(() => {
    if (!charterId) {
      return;
    }
    axios
      .get(`${apiUrl}/charters/${charterId}/fontfamilies`, {
        timeout: 30000,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((response) => {
        const { data } = response;
        setCharterFontFamilies(data.items);
      })
      .catch((e) => {
        console.error('Error during charter fonts fetch', e);
      });
  }, [charterId, token]);

  return (
    <>
      {/* Load public fonts stylesheets */}
      {publicFontFamilies &&
        publicFontFamilies.map((fontFamily) => (
          <StylesheetLink url={fontFamily.stylesheetUrl} key={`public_fontFamily_${fontFamily.id}`} />
        ))}
      {/* Load charter fonts stylesheets */}
      {charterFontFamilies &&
        charterFontFamilies.map((fontFamily) => (
          <StylesheetLink url={fontFamily.stylesheetUrl} key={`charter_fontFamily_${fontFamily.id}`} />
        ))}
    </>
  );
};

export default FontsLoader;
