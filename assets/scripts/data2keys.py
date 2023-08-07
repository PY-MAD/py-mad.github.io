import json

# Recursion Function To traverse inside the json file
def travJson(datamain,dir):
        data =datamain
        g = dir.copy()
        # There is multiple Types Maybe you hit
        # First Type Dictionart: This mean There is still data inside
        if isinstance(data,dict):
             for i in data:
                g2 = g.copy()
                g2.append(i)
                travJson(data[i],g2)
        # Second Type List: This is list of branches can get still inside
        elif isinstance(data,list):
            for index, lst in enumerate(data):
                g2 = g.copy()
                g2.append(str(index))
                travJson(lst,g2)
        # Third Type Integer: This mean we hit index, and There is still data inside
        elif isinstance(data,int):
            travJson(str(data),g)
        # Fourth Type String: Finaly where arrive to abstract data and can build dir and catograize for it
        elif isinstance(data,str):
            # not want to catograize imgs and videos
            if "http" in data or "/assets" in data or "/pages" in data:
                 return
            # prepare data
            g.pop()
            gString = ','.join(g)
            data = data.split(' ')

            for word in data:
                
                subWord = ""
                for c in word:
                    # convert from pdf unicode to 
                    
                    # ا
                    if c in ['إ','أ','آ']:
                        c='ا'
                    # Let's add data to list
                    subWord+=c
                    if subWord in dataNew:
                        dataNew[subWord].add(gString)
                    else:
                        dataNew[subWord]=set()
                        dataNew[subWord].add(gString)
                    # data without 'ال', Ex: to add حاسب and الحاسب
                    if subWord[:2] =='ال' and len(subWord)>=3:
                        subWordWithouAl = subWord[2:]
                        if subWordWithouAl in dataNew:
                            dataNew[subWordWithouAl].add(gString)
                        else:
                            dataNew[subWordWithouAl]=set()
                            dataNew[subWordWithouAl].add(gString)
              

        else:
            # Check if there is new data Type, it have to not work, if its work then there is problem
            print('IN ELSE')
            print('x'*100)    
            print('missing data type:', type(data))
            return

# Main Mehtod
with open("./assets/database/data.json",encoding="utf8") as f:
    dataO = json.load(f)
    dataNew = {}
    dir = []
    travJson(dataO,dir)
    for i in dataNew:
        dataNew[i] = list(dataNew[i]) # because set cannot convert it to json objects, only arrys(list)

    with open('./assets/database/keys.json','w') as f2:
        json.dump(dataNew,f2)
