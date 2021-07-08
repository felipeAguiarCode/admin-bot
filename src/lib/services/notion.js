require("dotenv").config({path:__dirname+"/./../../../.env"})

const { Client } = require("@notionhq/client")


const notion = new Client({
	auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = "2b3e5f27-54b6-4ba3-ac23-58aa4a77e0f5"
const PROGRAMA_ID = "e6099179eef7416ea35747eaef0c9260"

async function main(){
	const pageObject = await factoryPage({
		databaseID: DATABASE_ID,
		programaID: PROGRAMA_ID,
		pageName: "[FT] [08/09/2021 - 19h]Como se preparar para processos seletivos na everis",
		pageHour: "2021-08-05T14:00:00.000-03:00"
	})

	await notion.pages.create(pageObject)
    
}


async function factoryPage({databaseID, programaID, pageName, pageHour}){
	return {
		parent: {
			"type": "database_id",
			"database_id": databaseID
		},
		properties: {
			"Participantes confirmados": {
				"id": ":djA",
				"type": "checkbox",
				"checkbox": false
			},
			"Stream criado": {
				"id": "<jBQ",
				"type": "checkbox",
				"checkbox": false
			},
			"Código do programa": {
				"id": ">{}T",
				"type": "relation",
				"relation": [
					{
						"id": programaID
					}
				]
			},
			"Invite enviado": {
				"id": "GeSU",
				"type": "checkbox",
				"checkbox": false
			},
			"Apresentador(A)": {
				"id": "PGZv",
				"type": "people",
				"people": [
					{
						"object": "user",
						"id": "9ac58fd6-d61b-40d1-b7dc-52bd4ddad8d8",
						"name": "Adriana Silva",
						"avatar_url": "https://lh6.googleusercontent.com/-svv_568f4dk/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckKeTZ3F0Ujav4YRjHJqAr6Mnh5Uw/photo.jpg",
						"type": "person",
						"person": {
							"email": "adriana@digitalinnovation.one"
						}
					}
				]
			},
			"Cor Streamyard": {
				"id": "PbsA",
				"type": "rich_text",
				"rich_text": []
			},
			"Responsável": {
				"id": "UNoR",
				"type": "people",
				"people": [
					{
						"object": "user",
						"id": "106d9272-89f0-4d74-a55f-b129a38c7e46",
						"name": "Felipe Silva Aguiar",
						"avatar_url": "https://lh5.googleusercontent.com/-OSweJHbt5DY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclVIOt9KMGuLXwYpkasHUdC6ZlNRg/photo.jpg",
						"type": "person",
						"person": {
							"email": "felipe@digitalinnovation.one"
						}
					}
				]
			},
			"Programa": {
				"id": "Ur_S",
				"type": "rollup",
				"rollup": {
					"id":"1232",
					"type": "array",
					"array": [
						{
							"type": "relation",
							"relation": []
						}
					]
				}
			},
			"Github": {
				"id": "aW?w",
				"type": "rich_text",
				"rich_text": []
			},
			"Artes criadas": {
				"id": "oFMY",
				"type": "checkbox",
				"checkbox": false
			},
			"Cliente": {
				"id": "pD=t",
				"type": "select",
				"select": {
					"id": "74cfbf8c-4610-4e8a-9886-cb3420d31079",
					"name": "everis",
					"color": "green"
				}
			},
			"Link da Gravação": {
				"id": "s]l]",
				"type": "rich_text",
				"rich_text": []
			},
			"Data e horário": {
				"id": "u_]h",
				"type": "date",
				"date": {
					"start": "2021-08-05T14:00:00.000-03:00",
					"end": null
				}
			},
			"Fotos": {
				"id": "}GSv",
				"type": "files",
				"files": []
			},
			"Roteiro enviado": {
				"id": "}fwl",
				"type": "checkbox",
				"checkbox": false
			},
			"Name": {
				"id": "title",
				"type": "title",
				"title": [
					{
						"type": "text",
						"text": {
							"content": pageName,
							"link": null
						},
						"annotations": {
							"bold": false,
							"italic": false,
							"strikethrough": false,
							"underline": false,
							"code": false,
							"color": "default"
						},
						"plain_text": pageName,
						"href": null
					}
				]
			}
		}

	}
}

main()





