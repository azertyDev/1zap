import process from 'process';
const md5 = require('md5');
const parseString = require('xml2js').parseString;

export const getLaximoData = async (param: string) => {
    // hashing messages with MD5
    const hash = md5(`${param}${process.env.NEXT_PUBLIC_PASSWORD}`);

    const raw =
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '\n<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://WebCatalog.Kito.ec" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
        '<SOAP-ENV:Body><ns1:QueryDataLogin>' +
        `<param0 xsi:type="xsd:string">${param}</param0>` +
        `<param1 xsi:type="xsd:string">${process.env.NEXT_PUBLIC_LOGIN}</param1>` +
        `<param2 xsi:type="xsd:string">${hash}</param2>` +
        '</ns1:QueryDataLogin>' +
        '</SOAP-ENV:Body>' +
        '</SOAP-ENV:Envelope>\n';

    let dataRes;

    try {
        const res = await fetch(process.env.NEXT_PUBLIC_LAXIMO_URL as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml',
            },
            body: raw,
            redirect: 'follow',
        });

        const data = await res.text();
        await parseString(data, function (err: string, result: any) {
            if (result['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault']) {
                throw new Error();
            }
            dataRes = result['soapenv:Envelope']['soapenv:Body'][0]['QueryDataLoginResponse'][0]['return'][0];
        });
    } catch (err) {
        dataRes = null;
    }

    return dataRes;
};
