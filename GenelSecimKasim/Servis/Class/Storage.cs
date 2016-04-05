//using Amazon.S3;
//using Amazon.S3.Transfer;
//using Microsoft.WindowsAzure.Storage;
//using Microsoft.WindowsAzure.Storage.Auth;
//using Microsoft.WindowsAzure.Storage.Blob;
//using Newtonsoft.Json;
using System;
using System.IO;
using System.Xml;
using System.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Auth;
namespace Servis.Class
{
    static class Storage
    {
        //static CloudStorageAccount storageAccount = CloudStorageAccount.Parse(System.Configuration.ConfigurationManager.ConnectionStrings["BlobConnection"].ConnectionString);
        //static TransferUtility fileTransferUtility = new TransferUtility(new AmazonS3Client(ConfigurationManager.AppSettings["AmazonKeyId"], ConfigurationManager.AppSettings["AmazonSecretKey"], Amazon.RegionEndpoint.USEast1));

        //static string certificateFile = ConfigurationManager.AppSettings["GoogleP12certPath"];
        //static string serviceAccountEmail = ConfigurationManager.AppSettings["GoogleMail"];


        //static X509Certificate2 certificate = new X509Certificate2(certificateFile, "notasecret", X509KeyStorageFlags.Exportable);
        //static ServiceAccountCredential credential = new ServiceAccountCredential( new ServiceAccountCredential.Initializer(serviceAccountEmail){Scopes = new[] { StorageService.Scope.DevstorageReadWrite }}.FromCertificate(certificate));
        //static StorageService service = new StorageService(new BaseClientService.Initializer() { HttpClientInitializer = credential, ApplicationName = ConfigurationManager.AppSettings["GoogleAppName"], });
        //public static void JsonlariStorageYaz(string ad, XmlNode item)
        //{


        //    System.IO.File.WriteAllText(ConfigurationManager.AppSettings["TempFileFolder"] + ad + ".json", JsonConvert.SerializeObject(item));
        //    string key = Path.GetFileName(ConfigurationManager.AppSettings["TempFileFolder"] + ad + ".json");

        //    AzureSt(key, ad);
        //    //AmazonSt(key, ad);
        //    //GoogleSt(key, ad);



        //}

        //public static void JsonlariStorageYaz(string jsonAdi, string jsonIcerik)
        //{
        //    //CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
        //    //CloudBlobContainer container = blobClient.GetContainerReference(ConfigurationManager.AppSettings["AzureContainer"]);
        //    //CloudBlockBlob blockBlob = container.GetBlockBlobReference(jsonAdi);
        //    //try
        //    //{

        //    //    byte[] tempArray = System.Text.Encoding.UTF8.GetBytes(jsonIcerik);
        //    //    blockBlob.UploadFromByteArray(tempArray, 0, tempArray.Length);
        //    //    blockBlob.Properties.ContentType = "application/json";
        //    //    blockBlob.Properties.ContentEncoding = "UTF-8";
        //    //    blockBlob.SetProperties();
        //    //}
        //    //catch
        //    //{
        //    //}
        //}
        public static void GelenXmliStorageLogla(string dosyaAdi, string dosyaPath)
        {

            dosyaAdi = System.Environment.MachineName + "_" + dosyaAdi;

            //Account name and key. Modify for your account.
            string accountName = "aasecim";
            string accountKey = "WUmCSfc3u/a5tF8R1Qm157RvjiJ6M1wVUqhBtOWpXWEwVjg6uJ7I/1QkVK05tOcVfnN6jJA6R8AcpMAdEHz3Wg==";

            //Get a reference to the storage account, with authentication credentials.
            CloudStorageAccount storageAccount1 = new CloudStorageAccount(new StorageCredentials(accountName, accountKey), true);
            CloudBlobClient blobClient = storageAccount1.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(ConfigurationManager.AppSettings["AzureContainerLog"]);
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(dosyaAdi);
            try
            {
                using (var fs = System.IO.File.OpenRead(dosyaPath))
                {
                    blockBlob.UploadFromStream(fs, fs.Length);
                    blockBlob.Properties.ContentType = "application/json";
                    blockBlob.Properties.ContentEncoding = "UTF-8";
                    blockBlob.SetProperties();
                }
            }
            catch
            {

            }
        }


        //private static void AzureSt(string key, string ad)
        //{

        //    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
        //    CloudBlobContainer container = blobClient.GetContainerReference(ConfigurationManager.AppSettings["AzureContainer"]);
        //    CloudBlockBlob blockBlob = container.GetBlockBlobReference(key);
        //    try
        //    {
        //        using (var fs = System.IO.File.OpenRead(ConfigurationManager.AppSettings["TempFileFolder"] + ad + ".json"))
        //        {
        //            blockBlob.UploadFromStream(fs, fs.Length);
        //            blockBlob.Properties.ContentType = "application/json";
        //            blockBlob.Properties.ContentEncoding = "UTF-8";
        //            blockBlob.SetProperties();
        //        }
        //    }
        //    catch
        //    {

        //    }
        //}





        //private static void AmazonSt(string key, string ad)
        //{
        //    try
        //    {
        //        using (var fs = System.IO.File.OpenRead(ConfigurationManager.AppSettings["TempFileFolder"] + ad + ".json"))
        //        {
        //            TransferUtilityUploadRequest req = new TransferUtilityUploadRequest();
        //            req.BucketName = ConfigurationManager.AppSettings["AmazonBucket"];
        //            req.Headers.ContentEncoding = "UTF-8";
        //            req.InputStream = fs;
        //            req.Key = key;
        //            req.ContentType = "application/json";
        //            fileTransferUtility.Upload(req);
        //        }

        //    }
        //    catch (Exception)
        //    {

        //    }
        //}

        //private static void GoogleSt(string key, string ad)
        //{
        //    //try
        //    //{
        //    //    using (var fs = System.IO.File.OpenRead(ConfigurationManager.AppSettings["TempFileFolder"] + ad + ".json"))
        //    //    {
        //    //        Google.Apis.Storage.v1.Data.Object fileobj = new Google.Apis.Storage.v1.Data.Object() { Name = key };
        //    //        var resp = service.Objects.Insert(fileobj, ConfigurationManager.AppSettings["GoogleBucket"], fs, "application/json").Upload();
        //    //    }
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //}
        //}
    }
}
