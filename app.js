const {
    MongoClient,
    ObjectID
} = require('mongodb')

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'kampus';

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((error, client) => {
    if (error) {
        return console.log('Connection failed !!');
    }

    // console.log('Connection Successfuly !!')

    //pilih database
    const db = client.db(dbName);

    //menambah 1 data ke collection mahasiswa
    db.collection('mahasiswa').insertOne({
        name:'Dono',
        email:'dono@gmail.com'
    },
    (error, result)=>{
        if(error){
            return console.log('gagal menambahkan data !');
        }
        console.log(result);
    });

    //menambahkan  lebih dari 1 data
    db.collection('mahasiswa').insertMany(
        [
            {
                name:'Yanto',
                email:'yanto@gmail.com'
            },
            {
                name:'Joni',
                email:'joni@gmail.com'
            }
        ],
        (error, result) => {
            if(error){
                return console.log('data gagal ditambahkan !');
            }

            console.log(result);
        }
    )

    //Menampilkan semua data yang ada di collection 'mahasiswa'
    console.log(db.collection('mahasiswa').find().toArray((error, result) => {
        console.log(result);
    }));

    //Menampilkan data berdasarkan kriteria yang ada di collection 'mahasiswa'
    console.log(db.collection('mahasiswa').find({
            _id: ObjectID('654436caabe8202318351892')
        })
        .toArray((error, result) => {
            console.log(result);
        }));

    //Mengubah data berdasarkan ID
    const updatePromise = db.collection('mahasiswa').updateOne({
        _id: ObjectID('654436caabe8202318351892'),
    }, {
        $set: {
            name: 'Hirmawan Sugiyo',
        },
    })

    updatePromise.then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error)
    });

    //Mengubah data lebih dari 1 berdasarkan kriteria
    db.collection('mahasiswa').updateMany(
        {
        name: 'Hirmawan Sugiyo'
    },
    {
        $set : {
            name : 'Yana aja'
        }
    }
    )

    //menghapus 1 data
    db.collection('mahasiswa').deleteOne(
        {
            _id: ObjectID('654436caabe8202318351892')
        },
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });

    //Menghapus lebih dari 1 data
    db.collection('mahasiswa').deleteMany(
        {
            name: 'Yanto'
        },
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });

});