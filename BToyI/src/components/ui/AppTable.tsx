import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'

export default function AppTable(){
    return(
        <Card className="py-4 mt-12 flex flex-col shadow-none border-none">
            <CardHeader className="flex p-2">
                <div className="flex w-full justify-between items-center">
                    <div>
                        <CardTitle className="font-bold text-[23px]">
                            Products
                        </CardTitle>
                        <p className="text-sm text-slate-600">
                            xx products
                        </p>
                    </div>
                    <Button>
                        Add Product
                    </Button>
                </div>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    )
}