import pandas as pd

def main():
    site_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/site-table-final.csv")
    
    site_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/site_sql.txt'
    
    createTextFile(site_data, site_text)

def createTextFile(input_file, output_file):
    # input_file = input_file[1:]
    output_file_opened = open(output_file, 'a+')

    for ndx, row in input_file.iterrows():
        s = ''
        s = 'INSERT INTO SITE VALUES ('
        for key, val in enumerate(row):
            if key in []:
                s = s + "'" + str(val) + "',"
            else:
                s = s + str(val) + ','
        
        s = s[:-1] + ');'
        output_file_opened.write(s + '\n')

main()