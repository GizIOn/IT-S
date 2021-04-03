using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Scripts
{
    public class DirectoryWork
    {
        /// <summary>
        /// Takes all music files from given directory.
        /// </summary>
        /// <param name="files">Files to check</param>
        /// <returns></returns>
        public static List<DirectoryInfo> GetAlbums(List<FileInfo> files)
        {
            var list = new List<DirectoryInfo>();
            foreach (var file in from file in files
                let fileExtension = file.Extension
                where fileExtension == ".mp3" || fileExtension == ".wav"
                let flag = list.Where(t => file.Directory != null && t.FullName == file.Directory.FullName)
                    .Aggregate(true, (current, t) => !current)
                where flag
                select file)
            {
                list.Add(file.Directory);
            }

            return list;
        }
    }
}