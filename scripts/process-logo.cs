using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.IO;

public class LogoProcessor
{
    public static void Run(string inputPath, string lightPath, string darkPath)
    {
        byte[] bytes = File.ReadAllBytes(inputPath);
        using (MemoryStream ms = new MemoryStream(bytes))
        using (Bitmap src = new Bitmap(ms))
        {
            int w = src.Width;
            int h = src.Height;

            Bitmap lightBmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);
            Bitmap darkBmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            // First: find boundary of the right black arc
            // A pixel (x, y) is in the black arc if it is dark or enclosed by dark on the right half
            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    Color p = src.GetPixel(x, y);
                    int r = p.R;
                    int g = p.G;
                    int b = p.B;

                    int min = Math.Min(r, Math.Min(g, b));
                    int max = Math.Max(r, Math.Max(g, b));

                    // Check if blue
                    bool isBlue = (b - r > 60) && (b - g > 30);

                    if (isBlue)
                    {
                        lightBmp.SetPixel(x, y, Color.FromArgb(255, 13, 110, 253));
                        darkBmp.SetPixel(x, y, Color.FromArgb(255, 59, 130, 246));
                    }
                    else if (max < 80)
                    {
                        // Solid black/dark arc body
                        lightBmp.SetPixel(x, y, Color.FromArgb(255, 10, 15, 29));
                        darkBmp.SetPixel(x, y, Color.FromArgb(255, 255, 255, 255));
                    }
                    else if (min > 240)
                    {
                        // White - could be background OR circuit line inside the arc!
                        // The circuit lines are strictly in the right region (x > 500 and y between 300 and 700)
                        // AND they are bounded by the black arc (x between 550 and 850)
                        bool isCircuitLine = (x >= 550 && x <= 890 && y >= 340 && y <= 660);
                        if (isCircuitLine)
                        {
                            // In light theme: white circuit lines inside dark arc
                            lightBmp.SetPixel(x, y, Color.FromArgb(255, 255, 255, 255));
                            // In dark theme: dark slate circuit lines inside white arc
                            darkBmp.SetPixel(x, y, Color.FromArgb(255, 15, 23, 42));
                        }
                        else
                        {
                            // Background outside
                            lightBmp.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                            darkBmp.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                        }
                    }
                    else
                    {
                        // Anti-aliased transition pixels
                        // Calculate alpha relative to white background
                        int alpha = (int)((255 - min) / 45.0 * 255.0);
                        if (alpha < 0) alpha = 0;
                        if (alpha > 255) alpha = 255;

                        bool isNearCircuit = (x >= 550 && x <= 890 && y >= 340 && y <= 660);
                        if (isNearCircuit)
                        {
                            lightBmp.SetPixel(x, y, Color.FromArgb(255, r, g, b));
                            darkBmp.SetPixel(x, y, Color.FromArgb(255, 255 - r, 255 - g, 255 - b));
                        }
                        else
                        {
                            lightBmp.SetPixel(x, y, Color.FromArgb(alpha, 10, 15, 29));
                            darkBmp.SetPixel(x, y, Color.FromArgb(alpha, 255, 255, 255));
                        }
                    }
                }
            }

            // Find bounds
            int minX = w, maxX = 0, minY = h, maxY = 0;
            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    if (lightBmp.GetPixel(x, y).A > 15)
                    {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            int pad = 8;
            minX = Math.Max(0, minX - pad);
            minY = Math.Max(0, minY - pad);
            maxX = Math.Min(w - 1, maxX + pad);
            maxY = Math.Min(h - 1, maxY + pad);

            int cropW = maxX - minX + 1;
            int cropH = maxY - minY + 1;

            SaveCropped(lightBmp, lightPath, minX, minY, cropW, cropH);
            SaveCropped(darkBmp, darkPath, minX, minY, cropW, cropH);

            lightBmp.Dispose();
            darkBmp.Dispose();
            Console.WriteLine("Done cropping and saving.");
        }
    }

    private static void SaveCropped(Bitmap src, string path, int minX, int minY, int cropW, int cropH)
    {
        using (Bitmap dest = new Bitmap(cropW, cropH, PixelFormat.Format32bppArgb))
        using (Graphics g = Graphics.FromImage(dest))
        {
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.SmoothingMode = SmoothingMode.HighQuality;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;

            Rectangle sRect = new Rectangle(minX, minY, cropW, cropH);
            Rectangle dRect = new Rectangle(0, 0, cropW, cropH);
            g.DrawImage(src, dRect, sRect, GraphicsUnit.Pixel);

            using (MemoryStream ms = new MemoryStream())
            {
                dest.Save(ms, ImageFormat.Png);
                File.WriteAllBytes(path, ms.ToArray());
            }
        }
    }
}
