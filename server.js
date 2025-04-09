import { express, cors, dotenv, helmet,
  connectDB, userRoutes, productRoutes,
  customerRoutes,orderRoutes, shipmentRoutes,orderItemRoutes
} from './src/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/order-items', orderItemRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Buyurtmalar boshqarish tizimi API ga xush kelibsiz!' });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server http://localhost:${PORT} portda ishlayapti`);
    });
  } catch (error) {
    console.error('Server ishga tushirilmadi:', error.message);
    process.exit(1);
  }
};

startServer();