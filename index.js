const axios = require("axios");
const cheerio = require("cheerio");

const dates = [];
const titles = [];
const links = [];
const result = [];
const url =
  "https://www.diariomunicipal.sc.gov.br/?r=site/index&q=abertura+categoria%3ALicita%C3%A7%C3%B5es&AtoASolrDocument_page=1";

const getData = async () => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    $("span.quiet").each((i, ele) => {
      const p_d = $(ele).text().split("-")[0].trim();
      dates.push(p_d);
    });

    $("#content > div.row.no-print.resultado-pesquisa > h4 > a").each(
      (i, ele) => {
        const title = $(ele).text();
        const link = $(ele).attr("href");
        titles.push(title);
        links.push(link);
      }
    );

    for (let i = 0; i < titles.length; i++) {
      result.push({
        title: titles[i],
        published_date: dates[i],
        link: links[i],
      });
    }

    console.log(`Scraped data stored in API format:`);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

getData();

// --------------- OUTPUT -----------------

// Scraped data stored in API format
// [
//   {
//     title: 'EXTRATO DE PUBLICAÇÃO DO PL 084/2022',
//     published_date: '29/08/2022 17:21',
//     link: 'https://www.diariomunicipal.sc.gov.br/arquivosbd/atos/2022/08/1661804451_extrato_extrato.pdf'
//   },
//   {
//     title: 'EXTRATO EDITAL PREGAO PRESENCIAL 055/2022',
//     published_date: '29/08/2022 17:09',
//     link: 'https://www.diariomunicipal.sc.gov.br/arquivosbd/atos/2022/08/1661445290_aviso_licitao__rolo_e_patrola_extrato.pdf'
//   },
//   {
//     title: 'EDITAL PL 120.2022, PR 53.2022',
//     published_date: '29/08/2022 16:22',
//     link: 'https://www.diariomunicipal.sc.gov.br/arquivosbd/atos/2022/08/1661800966_avi217720221201_extrato.pdf'
//   },
//   {
//     title: 'ATA DA TOMADA DE PREÇOS Nº 005/2022',
//     published_date: '29/08/2022 15:48',
//     link: 'https://www.diariomunicipal.sc.gov.br/arquivosbd/atos/2022/08/1661798842_ata_extrato.pdf'
//   },
//   {
//     title: 'HOMOLOGAÇÃO PL 116.2022, DL 37.2022',
//     published_date: '29/08/2022 15:27',
//     link: 'https://www.diariomunicipal.sc.gov.br/arquivosbd/atos/2022/08/1661797636_th2177202211615_extrato.pdf'
//   },
//   {
//     title: 'PUBLICAÇÃO DA 1ª ALTERAÇÃO DE EDITAL DE PREGÃO Nº PMC 78/2022 (ELETRÔNICO',
//     published_date: '29/08/2022 14:54',
//     link: 'https://www.diariomunicipal.sc.gov.br/arquivosbd/atos/2022/08/1661795261_alterao__78.2022__prego_eletronico___dentes_e_suporte_extrato.pdf'
//   },
//   {
//     title: 'PUBLICAÇÃO DA 1ª ALTERAÇÃO DE EDITAL DE PREGÃO Nº FMS 28/2022 (ELETRÔNICO',
//     published_date: '29/08/2022 14:54',
//     link: 'https://www.diariomunicipal.sc.gov.br/arquivosbd/atos/2022/08/1661795604_alterao__28.2022__prego_eletronico__tiras_de_glicemia_extrato.pdf'
//   },
//   {
//     title: 'ERRATA 1 DO EDITAL PRG 048 -2022 FMS - MANUTENÇÃO DE EQUIPAMENTOS MÉDICOS',
//     published_date: '29/08/2022 14:41',
//     link: 'https://www.diariomunicipal.sc.gov.br/arquivosbd/atos/2022/08/1661794860_errata_1_do_edital_prg_048_2022__fms__manuteno_de_equipamentos_mdicos_extrato.pdf'
//   },
//   {
//     title: 'EXTRATO PROCESSO LICITATÓRIO N° 005-2022-PP 002-2022',
//     published_date: '29/08/2022 14:14',
//     link: 'https://www.diariomunicipal.sc.gov.br/arquivosbd/atos/2022/08/1661793239_extrato_processo_licitatrio_n_0052022pp_0022022_extrato.pdf'
//   },
//   {
//     title: 'AVISO DA LICITAÇÃO Nº 56/2022 PP',
//     published_date: '29/08/2022 13:28',
//     link: 'https://www.diariomunicipal.sc.gov.br/arquivosbd/atos/2022/08/1661790484_aviso_de_licitao_pp_56_2022_extrato.pdf'
//   }
// ]
