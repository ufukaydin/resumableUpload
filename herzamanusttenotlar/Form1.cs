using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace herzamanusttenotlar
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            hScrollBar1.Minimum = 30;
            hScrollBar1.Maximum = 100;
            hScrollBar1.Value = 100;
        
        }

        private void hScrollBar1_Scroll(object sender, ScrollEventArgs e)
        {
            double x = e.NewValue * 0.01;
            this.Opacity = x;
        }

        private void richTextBox1_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
