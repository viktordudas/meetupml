library("RCurl")
library("RJSONIO")

# Accept SSL certificates issued by public Certificate Authorities
options(RCurlOptions = list(sslVersion=3L, cainfo = system.file("CurlSSL", "cacert.pem", package = "RCurl")))

h = basicTextGatherer()
req = list(Id="score00001",
           Instance=list(FeatureVector=
                           list(
                             C01= 0, C02= 0, C03= 9, C04=12, C05= 7, C06= 0, C07= 0, C08= 0, 
                             C09= 0, C10= 6, C11=15, C12= 4, C13=14, C14= 4, C15= 0, C16= 0, 
                             C17= 0, C18= 4, C19= 3, C20= 0, C21=12, C22= 4, C23= 0, C24= 0, 
                             C25= 0, C26= 0, C27= 0, C28= 0, C29=16, C30= 2, C31= 0, C32= 0, 
                             C33= 0, C34= 0, C35= 0, C36= 8, C37=11, C38= 0, C39= 0, C40= 0, 
                             C41= 0, C42= 0, C43= 6, C44=16, C45= 4, C46= 1, C47=12, C48= 0, 
                             C49= 0, C50= 5, C51=16, C52=15, C53=13, C54=13, C55=15, C56= 0, 
                             C57= 0, C58=12, C59= 9, C60= 3, C61=11, C62=16, C63= 8, C64= 0                           )
                         ,
                         GlobalParameters=
                           fromJSON('{}')
           ))

body = toJSON(req)
api_key = "T3DcWCjPQETcNy5idib7sC4u4ysFmR/Io5oyQjEMYwkuLm4I4WFCESnW0cPSLxDtNW9SJo0+RKBMZPzTyN+/sg==" # Replace this with the API key for the web service
authz_hdr = paste('Bearer', api_key, sep=' ')

h$reset()
curlPerform(url = "https://ussouthcentral.services.azureml.net/workspaces/83d466c703644e079b388d51e04668e2/services/f76e2595f25842a6a6f806d38b6bc4a6/score",
            httpheader=c('Content-Type' = "application/json", 'Authorization' = authz_hdr),
            postfields=body,
            writefunction = h$update,
            verbose = TRUE
)

result = h$value()
print(result)
